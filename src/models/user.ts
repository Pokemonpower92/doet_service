import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import DoetList from "./doetList";
import Doet from "./doet";

interface IUser {
  email: string;
  username: string;
  doetLists: [mongoose.Types.ObjectId];
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    doetLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoetList",
      },
    ],
  },
  { timestamps: true },
);
UserSchema.plugin(passportLocalMongoose);

UserSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    Promise.all(
      doc.doetLists.map(async (doetListId: mongoose.Types.ObjectId) => {
        const list = await DoetList.findById(doetListId).exec();
        await Doet.deleteMany({ _id: { $in: list.doets } });
        await DoetList.deleteOne(list._id);
      }),
    );
  }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
