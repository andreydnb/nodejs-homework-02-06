const authService = require('../../services/auth/index')
const {HttpStatusCode} = require('../../libs/constants')

const registration = async (req, res) => {
    const user = await authService.create(req.body)
    return res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        code: HttpStatusCode.CREATED,
        data: { ...user },
    })
}
const login = async (req, res) => {
    const token = await authService.login(req.body)
    return res.status(HttpStatusCode.OK).json({
        status: 'success', code: HttpStatusCode.OK,
        data: { ...token }
    })
 }
const logout = async (req, res) => { 
    await authService.logout(req.user.id)
    return res.status(HttpStatusCode.NO_CONTENT).json()
}

const verifyUser = async (req, res) => {
    const token = req.params.token
    const user = await authService.verifyUser(token)
    return res.status(HttpStatusCode.OK).json({
        status: 'success', code: HttpStatusCode.OK,
        data: { message: `User verified. Welcome ${user.name}` }
    })

 }
const reverifyEmail = async (req, res) => {
    const { email } = req.body
    await authService.reverifyEmail(email)
    return res.status(HttpStatusCode.OK).json({
        status: 'success', code: HttpStatusCode.OK,
        data: { message: 'Success' }
    })
    
}

module.exports = {registration, login, logout, verifyUser, reverifyEmail}
