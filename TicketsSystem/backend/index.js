const cors = require("cors")
const http = require('http')
const dotenv = require("dotenv")
const express = require("express")
const { Server } = require("socket.io")
const reset_method = require("./resetpassword")
const { MongoClient, ServerApiVersion } = require("mongodb")

dotenv.config()
const Express = express()
const Port = process.env.PORT || 8000
const server = http.createServer(Express)
const MongoDB = new MongoClient(process.env.RESTREVIEWS_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

Express.use(cors())
Express.use(express.json())
Express.use(reset_method)

const emit_tickets = (dbo, io, end = 8, start = 0) => {
    let map = [];
    dbo.collection("tickets").find().skip(start).limit(end).toArray().catch(e => console.log(e)).then((A) => {
        A.forEach(e => map.push(e))
    }).then(() => {
        dbo.collection("tickets").countDocuments().then((value) => {
            io.emit("tickets", {tickets_list: map, startp: end})
            io.emit("tickets-size", {tickets_size: value})
        })
    });
} 

MongoDB.connect().catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then((client) => {
        let dbo = client.db("ticketsystem")
        const io = new Server(server, {cors: {
            origin: "*",
            methods: ["POST", "GET"]
        }});
        io.on('connection', (socket) => {
            emit_tickets(dbo, io)
            socket.on("ticket-delete", ({ticket, user}) => {
                if (!ticket) return
                dbo.collection("tickets").deleteOne({name: ticket}).catch((e) => console.log(e)).then(() => {
                    io.emit("ticket-deleted", {ticket, user})
                    io.emit("ticket-delete-anim", {ticket: ticket})
                    setTimeout(() => emit_tickets(dbo, io), 1500)
                })
            })
            socket.on("page-change", ({page}) => {
                let start = page > 1 ? (page * 8 - 8) : 0
                let end = page > 1 ? (page * 8) : 8
                emit_tickets(dbo, socket, end, start)
            })
            socket.on("ticket-submit", ({ticket, desc, user}) => {
                dbo.collection("tickets").find({name: ticket}).toArray().then((list)=>{
                    if (list.length > 0) {
                        socket.volatile.emit("ticket-exists", {msg: "There is already a ticket open for the " + ticket + "."})
                    } else {
                        dbo.collection("tickets").insertOne({
                            desc: desc,
                            name: ticket,
                            user: user
                        }).catch(e => console.log(e)).then(() => {
                            socket.emit("ticket-close-modal")
                            io.emit("ticket-created", {ticket, desc, user})
                            emit_tickets(dbo, io)
                        })
                    }
                });
            })
        });
        let tickets_col_exists = false
        console.log("Connected to the database!")
        dbo.collections().then((colection) => {
            if (colection.length == 0) {
                return;
            }
            colection.map((col) => {
                if (col.collectionName.match("tickets")) {
                    tickets_col_exists = true;
                }
            })
        }).then(() => {
            if (!tickets_col_exists) {
                dbo.createCollection("tickets").catch(err => {
                    console.log(err)
                    process.exit(1)
                }).then(() => console.log("Collection 'tickets' have been created!"))
            }
            console.log("Seems fine, have fun :)")
        }).then(() => {
            server.listen(Port)
            console.log(`Listening on port ${Port}.`)
        })
    }
)

module.exports = {MongoDB, Express}