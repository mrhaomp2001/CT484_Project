const config = {
    app: {
        port: process.env.PORT || 8088,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://admin:abc201199@cluster0.3crqh.mongodb.net/ct484?retryWrites=true&w=majority"
    },
    jwt: {
		secret: process.env.JWT_SECRET || "wbchat-secret-key",
        // secretReresh: process.env.JWT_SECRETRERESH || "wbchat-secret-reresh-key",
        tokenLife: process.env.JWT_LIFE || 86400, // 24h 
        // tokenLifeReresh: process.env.JWT_LIFE_RERESH || 20, // 24h 
	},
}
module.exports = config;