import mongoose from "mongoose";
import DoetList from "./doetList";

const DoetSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: false,
        default: ""
    },
    priority: {
        type: String,
        required: false,
        enum: ["high", "medium", "low"],
    },
    status: {
        type: String,
        required: true,
        enum: ["done", "in progress", "backlog", "won't do"]
    },
    doetList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoetList",
        require: false
    }
}, {timestamps: true});


DoetSchema.post("findOneAndDelete", async function(doc){
    if (doc) {
        await DoetList.updateOne({_id: doc.doetList}, {$pull: { doets: doc._id }} );
    }
})

const Doet = mongoose.model("Doet", DoetSchema);



export default Doet;
