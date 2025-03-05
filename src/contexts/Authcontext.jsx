import { createContext, useContext, useState } from "react";
import { USER_INFO } from "../constants/appConstant";

// On définit notre contexte d'authentification
const AuthContext = createContext({
    userId: '', //state
    email: '', //state
    nickname: '', //state
    setUserId: () => {}, //Méthode pour modifier le state userId
    setEmail: () => {}, //Méthode pour modifier le state email
    setNickname: () => {}, //Méthode pour modifier le state nickname
    signIn: async () => {}, //Méthode pour se connecter
    signOut: async () => {}, //Méthode pour se déconnecter
});

// on va définir toute la mécanique de notre contexte d'authentification
const AuthContextProvider = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    // On définit notre méthode singIn pour la connexion
    const signIn = async (user) => {
        try {
            // On remplit nos states avec les données de l'utilisateur
            setUserId(user.userId);
            setEmail(user.email);
            setNickname(user.nickname);
            // On enregistre les données de l'utilisateur dans le localStorage
            localStorage.setItem(USER_INFO, JSON.stringify(user));
        } catch (error) {
            throw new Error(`Erreur lors de la connexion : ${error}`);
        }
    }

    // On définit notre méthode signOut pour la déconnexion
    const signOut = async () => {
        try {
            // On remplit nos states avec les données de l'utilisateur
            setUserId('');
            setEmail('');
            setNickname('');
            // On supprime les données de l'utilisateur dans le localStorage
            localStorage.removeItem('USER_INFO');
        } catch (error) {
            throw new Error(`Erreur lors de la déconnexion : ${error}`);
        }
    }

    // On définit les valeurs de notre contexte
    const value = {
        userId,
        email,
        nickname,
        setUserId,
        setEmail,
        setNickname,
        signIn,
        signOut,
    }

    // On retourne notre contexte d'authentification
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Création d'un hook personnalisé pour utiliser le contexte d'authentification
const useAuthContext = () => useContext(AuthContext);

// On exporte notre contexte d'authentification
export { AuthContextProvider, useAuthContext, AuthContext };