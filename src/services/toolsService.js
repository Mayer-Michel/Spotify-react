/**
 * méthode qui retourne la durée total d'un album au format 1h 15min 32s
 * @param objectData objet qui doit contenir un tableau de songs 
 * @returns string formaté en 1h 15min 32s
 */
export const totalDuration= (objectData) => {
    // on va calculer le nombre de seconde pour tous les titres
    const totalSeconds = objectData?.songs && objectData?.songs.map(function (titre) {
        return parseInt(titre.duration);
    }).reduce(function (a, b) {
        return a + b;
    }, 0)

    // on va formater les secondess en heure, minutes, secondes
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // on retourne une string formaté sous la forme 1h 15min 30s
    return hours > 0
        ? `${hours}h ${minutes}min ${seconds}s`
        : `${minutes}min ${seconds}s`;
}