const typeImage = tipo => {
    let retorno = null;

    switch (tipo) {
        case 1: // Foto de Perfil
            retorno = [
                { w: 100, h: 100, folder: "100x100", name: "perfil" },
                { w: 400, h: 400, folder: "400x400", name: "perfil" },
                { w: 450, h: 258, folder: "450x258", name: "perfil" }
            ];
            break;

        case 2: // Publicidade
            retorno = [
                { w: 450, h: 258, folder: "450x258", name: "publicidade" },
                { w: 600, h: 344, folder: "600x344", name: "publicidade" }
            ];
            break;

        case 3: // Logo
            retorno = [
                { w: 450, h: 258, folder: "450x258", name: "logo" },
                { w: 600, h: 344, folder: "600x344", name: "logo" }
            ];
            break;

        case 4: // Capa
            retorno = [
                { w: 450, h: 75, folder: "450x75", name: "capa" },
                { w: 1800, h: 300, folder: "1800x300", name: "capa" }
            ];
            break;

        case 5: // Galeria
            retorno = [
                { w: 400, h: 400, folder: "400x400", name: "galeria" },
                { w: 450, h: 258, folder: "450x258", name: "galeria" },
                { w: 900, h: 516, folder: "900x516", name: "galeria" }
            ];
            break;

        case 6: // Flyer
            retorno = [
                { w: 450, h: false, folder: "prop450", name: "flyer" },
                { w: 900, h: false, folder: "prop900", name: "flyer" }
            ];
            break;

        case 7: // Video
            retorno = [{ w: 320, h: 180, folder: "320x180", name: "video" }];
            break;
        case 8: // Test
            retorno = [{ w: 900, h: 600, folder: "test", name: "test" }];
            break;
    }

    return retorno;
};

module.exports = { typeImage };
