    import bcrypt from 'bcrypt';
    import User from '../models/User.js';
    import jwt from 'jsonwebtoken';
    import crypto from "crypto";
    import Session from '../models/Session.js';

    const ACCESS_TOKEN_TTL = '30m' ;
    const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;     // 14 ngày    
    export const signUp = async  (req,res) => {
        try {
            const { name, email, password } = req.body;
    
        // Kiểm tra thiếu field
        if (!name || !email || !password)
        return res.status(400).json({ message: "Missing fields" });

        // Kiểm tra email đã tồn tại
        const exist = await User.findOne({ email });
        if (exist)
        return res.status(400).json({ message: "Email already used" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10); 
        
        // Tạo user
        await User.create({
            username: name,
            hashedPassword,
            email,
            displayName: name
        })

        // return 
        return res.status(201).json({ message: "Signup successful" });

        
        } catch (error) {
            console.error("Lỗi khi gọi signUp",error);
            return res.status(500).json({ message: "Lỗi hệ thống"});
        }
    };

    export const signIn = async (req,res) => {
        try {
            // lấy inputs
            const {email, password} = req.body;
            
            
            if(!email || !password){
                return res.status(400).json({message: "Thiếu email hoặc password"});  
            }
            
            // lấy hashedPassword trong db để so sánh với password của người dùng vừa nhập
            const user = await User.findOne({email});

            if(!user){
                return res.status(401).json({message: "Email hoặc password không đúng"});
            }

            // kiểm tra password
            const passwordCorrect = await bcrypt.compare(password,user.hashedPassword);

            if(!passwordCorrect){
                return res.status(401).json({message: "Email hoặc password không đúng"});
            }


            // nếu khớp thì tạo access token với jwt
            const accessToken = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: ACCESS_TOKEN_TTL }
                );
   

            // tạo refresh token 
            const refreshToken = crypto.randomBytes(64).toString("hex");

            // tạo session mới để lưu refresh token
            await Session.create({
                userId: user._id,
                refreshToken,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
            });

            // gửi refresh token cho client qua cookie
            res.cookie('refreshToken',refreshToken, {
                httpOnly: true,
                secure: false,   // true nếu dùng https
                sameSite: 'none',
                maxAge: REFRESH_TOKEN_TTL
            })

            // còn access token thì trả thẳng về trong res
            return res.status(200).json({
                message: `User ${user.displayName} đã logged in!`,
                accessToken,
                user: {
                    id: user._id,
                    name: user.displayName,
                    email: user.email,
                    role: user.role ?? "customer"
                }
                });


        } catch (error) {
            console.error("Lỗi khi gọi signIp",error);
            return res.status(500).json({ message: "Lỗi hệ thống"});
        }
    };