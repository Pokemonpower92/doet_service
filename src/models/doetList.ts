import mongoose from "mongoose"
import { Types, Document } from "mongoose"
import User from "./user";
import Doet from "./doet";

interface IDoetList {
    title: string,
    date: Date,
    user: mongoose.Types.ObjectId,
    doets: [mongoose.Types.ObjectId]
}

const DoetListSchema  = new mongoose.Schema<IDoetList>({
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
        await Doet.deleteMany({ doetList: doc._id})
    }
})

const DoetList = mongoose.model<IDoetList>("DoetList", DoetListSchema);

export default DoetList;

