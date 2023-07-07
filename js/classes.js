console.log('classes.js');
// Classe Personnage
// Attributs : id, nom, slug, titre, role, description, id_localite, id_emplacement
class Personnage {
    // CONSTRUCTEUR
    constructor(id, nom, slug, titre, role, description, id_localite, id_emplacement) {
        this.id = id;
        this.nom = nom;
        this.slug = slug;
        this.titre = titre;
        this.role = role;
        this.description = description;
        this.id_localite = id_localite;
        this.id_emplacement = id_emplacement;
    }

    // GETTERS
    getIdPersonnage() {
        return this.id;
    }

    getNomPersonnage() {
        return this.nom;
    }

    getSlugPersonnage() {
        return this.slug;
    }

    getTitrePersonnage() {
        return this.titre;
    }

    getRolePersonnage() {
        return this.role;
    }

    getDescriptionPersonnage() {
        return this.description;
    }

    getIdLocalitePersonnage() {
        return this.id_localite;
    }

    getIdEmplacementPersonnage() {
        return this.id_emplacement;
    }

    getAllPersonnage() {
        return {
            id: this.id,
            nom: this.nom,
            slug: this.slug,
            titre: this.titre,
            role: this.role,
            description: this.description,
            id_localite: this.id_localite,
            id_emplacement: this.id_emplacement,
        };
    }

    // SETTERS
    setIdPersonnage(id) {
        this.id = id;
    }

    setNomPersonnage(nom) {
        this.nom = nom;
    }

    setSlugPersonnage(slug) {
        this.slug = slug;
    }

    setTitrePersonnage(titre) {
        this.titre = titre;
    }

    setRolePersonnage(role) {
        this.role = role;
    }

    setDescriptionPersonnage(description) {
        this.description = description;
    }

    setIdLocalitePersonnage(id_localite) {
        this.id_localite = id_localite;
    }

    setIdEmplacementPersonnage(id_emplacement) {
        this.id_emplacement = id_emplacement;
    }
}
window.Personnage = Personnage;

// Classe Position
// Attributs : id, top, left, height, width, scaling, zIndex, image, idLocalite, idPersonnage, idRegion, idEmplacement*
class Position {
    // CONSTRUCTEUR
    constructor(id, top, left, height, width, scaling, zIndex, image, idLocalite, idPersonnage, idRegion, idEmplacement) {
        this.id = id;
        this.top = top;
        this.left = left;
        this.height = height;
        this.width = width;
        this.scaling = scaling;
        this.zIndex = zIndex;
        this.image = image;
        this.idLocalite = idLocalite;
        this.idPersonnage = idPersonnage;
        this.idRegion = idRegion;
        this.idEmplacement = idEmplacement;
    }

    // GETTERS
    getId() {
        return this.id;
    }

    getTop() {
        return this.top;
    }

    getLeft() {
        return this.left;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getScaling() {
        return this.scaling;
    }

    getZIndex() {
        return this.zIndex;
    }

    getImage() {
        return this.image;
    }

    getIdLocalite() {
        return this.idLocalite;
    }

    getIdPersonnage() {
        return this.idPersonnage;
    }

    getIdRegion() {
        return this.idRegion;
    }

    getIdEmplacement() {
        return this.idEmplacement;
    }

    // SETTERS
    setId(id) {
        this.id = id;
    }

    setTop(top) {
        this.top = top;
    }

    setLeft(left) {
        this.left = left;
    }

    setHeight(height) {
        this.height = height;
    }

    setWidth(width) {
        this.width = width;
    }

    setScaling(scaling) {
        this.scaling = scaling;
    }

    setZIndex(zIndex) {
        this.zIndex = zIndex;
    }

    setImage(image) {
        this.image = image;
    }

    setIdLocalite(idLocalite) {
        this.idLocalite = idLocalite;
    }

    setIdPersonnage(idPersonnage) {
        this.idPersonnage = idPersonnage;
    }

    setIdRegion(idRegion) {
        this.idRegion = idRegion;
    }

    setIdEmplacement(idEmplacement) {
        this.idEmplacement = idEmplacement;
    }
}
window.Position = Position;

// Classe Emplacement
// Attributs : id, nom, nbMembres, description, idLocalite
class Emplacement {
    // CONSTRUCTEUR
    constructor(id, nom, nbMembres, description, idLocalite) {
        this.id = id;
        this.nom = nom;
        this.nbMembres = nbMembres;
        this.description = description;
        this.idLocalite = idLocalite;
    }

    // GETTERS
    getId() {
        return this.id;
    }

    getNom() {
        return this.nom;
    }

    getNbMembres() {
        return this.nbMembres;
    }

    getDescription() {
        return this.description;
    }

    getIdLocalite() {
        return this.idLocalite;
    }

    // SETTERS
    setId(id) {
        this.id = id;
    }

    setNom(nom) {
        this.nom = nom;
    }

    setNbMembres(nbMembres) {
        this.nbMembres = nbMembres;
    }

    setDescription(description) {
        this.description = description;
    }

    setIdLocalite(idLocalite) {
        this.idLocalite = idLocalite;
    }
}

// Classe Localite
// Attributs : id, nom, population, description, idRegion, idPersonnage
class Localite {
    // CONSTRUCTEUR
    constructor(id, nom, population, description, idRegion, idPersonnage) {
        this.id = id;
        this.nom = nom;
        this.population = population;
        this.description = description;
        this.idRegion = idRegion;
        this.idPersonnage = idPersonnage;
    }

    // GETTERS
    getId() {
        return this.id;
    }

    getNom() {
        return this.nom;
    }

    getPopulation() {
        return this.population;
    }

    getDescription() {
        return this.description;
    }

    getIdRegion() {
        return this.idRegion;
    }

    getIdPersonnage() {
        return this.idPersonnage;
    }

    // SETTERS
    setId(id) {
        this.id = id;
    }

    setNom(nom) {
        this.nom = nom;
    }

    setPopulation(population) {
        this.population = population;
    }

    setDescription(description) {
        this.description = description;
    }

    setIdRegion(idRegion) {
        this.idRegion = idRegion;
    }

    setIdPersonnage(idPersonnage) {
        this.idPersonnage = idPersonnage;
    }
}

// Classe Region
// Attributs : id, nom, fr, capitale, population, description, coutumes, idPersonnage, regionMereId
class Region {
    // CONSTRUCTEUR
    constructor(id, nom, fr, capitale, population, description, coutumes, idPersonnage, regionMereId) {
        this.id = id;
        this.nom = nom;
        this.fr = fr;
        this.capitale = capitale;
        this.population = population;
        this.description = description;
        this.coutumes = coutumes;
        this.idPersonnage = idPersonnage;
        this.regionMereId = regionMereId;
    }

    // GETTERS
    getId() {
        return this.id;
    }

    getNom() {
        return this.nom;
    }

    getFr() {
        return this.fr;
    }

    getCapitale() {
        return this.capitale;
    }

    getPopulation() {
        return this.population;
    }

    getDescription() {
        return this.description;
    }

    getCoutumes() {
        return this.coutumes;
    }

    getIdPersonnage() {
        return this.idPersonnage;
    }

    getRegionMereId() {
        return this.regionMereId;
    }

    // SETTERS
    setId(id) {
        this.id = id;
    }

    setNom(nom) {
        this.nom = nom;
    }

    setFr(fr) {
        this.fr = fr;
    }

    setCapitale(capitale) {
        this.capitale = capitale;
    }

    setPopulation(population) {
        this.population = population;
    }

    setDescription(description) {
        this.description = description;
    }

    setCoutumes(coutumes) {
        this.coutumes = coutumes;
    }

    setIdPersonnage(idPersonnage) {
        this.idPersonnage = idPersonnage;
    }

    setRegionMereId(regionMereId) {
        this.regionMereId = regionMereId;
    }
}

// Classe Administrer
// Attributs : id, idPersonnage
class Administrer {
    // CONSTRUCTEUR
    constructor(id, idPersonnage) {
        this.id = id;
        this.idPersonnage = idPersonnage;
    }

    // GETTERS
    getId() {
        return this.id;
    }

    getIdPersonnage() {
        return this.idPersonnage;
    }

    // SETTERS
    setId(id) {
        this.id = id;
    }

    setIdPersonnage(idPersonnage) {
        this.idPersonnage = idPersonnage;
    }
}

// Classe Conseiller
// Attributs : id, idRegion
class Conseiller {
    // CONSTRUCTEUR
    constructor(id, idRegion) {
        this.id = id;
        this.idRegion = idRegion;
    }

    // GETTERS
    getId() {
        return this.id;
    }

    getIdRegion() {
        return this.idRegion;
    }

    // SETTERS
    setId(id) {
        this.id = id;
    }

    setIdRegion(idRegion) {
        this.idRegion = idRegion;
    }
}
