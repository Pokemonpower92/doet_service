import mongoose from "mongoose"
import User from "./user";
import Doet from "./doet";

const DoetListSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    doets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doet"
    }]
}, {timestamps: true});

DoetListSchema.post("findOneAndDelete", async function(doc){
    if (doc) {
        await User.updateOne({_id: doc.user}, {$pull: { doetLists: doc._id }} );
    }
})

const DoetList = mongoose.model("DoetList", DoetListSchema);

export default DoetList;

