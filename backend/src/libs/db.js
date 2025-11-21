import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log('Liên kết CSDL thành công!');
    } catch (error) {
        console.log('Lỗi khi kết nối cơ sở dữ liệu',error);
        process.exit(1);
    }
}