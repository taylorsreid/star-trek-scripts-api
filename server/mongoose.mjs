import "./loadEnvironment.mjs";
import mongoose_import from 'mongoose';
let mongoose = await mongoose_import.connect(process.env.ATLAS_URI);
export default mongoose;