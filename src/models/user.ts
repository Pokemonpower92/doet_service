import mongoose from "mongoose";
import DoetList from "./doetList";
import Doet from "./doet";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    doetLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoetList"
    }]
}, {timestamps: true})

UserSchema.post("findOneAndDelete", async function(doc){
    if (doc) {
        Promise.all(doc.doetLists.map(async (doetListId: mongoose.Types.ObjectId) => {
            const list = await DoetList.findById(doetListId);
            await Doet.deleteMany({_id: {$in: list.doets}});
            await DoetList.deleteOne(list._id);
        }))
    }
})

const User = mongoose.model("User", UserSchema);

export default User;