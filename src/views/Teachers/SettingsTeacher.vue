<template>
    <div class="container-profile">
        <div class="carta">
            <h1>Bienvenido Kevin Chan</h1>
            <div class="perfil">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="">
            </div>

            <form class="formulario">
                <div class="columna">
                    <div class="inputs">
                        <input type="text" id="nombre" placeholder=" " value="Heribé Felipe Uribe Santiago" readonly>
                        <label for="nombre">Nombre completo</label>
                    </div>
                    <div class="inputs">
                        <input type="email" id="email" placeholder=" " value="heribeuribe@uacam.mx" readonly>
                        <label for="email">Correo Electrónico</label>
                    </div>
                    <div class="inputs">
                        <input type="tel" id="telefono" placeholder=" " value="981 123 4567" readonly>
                        <label for="telefono">Teléfono</label>
                    </div>
                </div>
                <div class="columna">
                    <div class="inputs">
                        <input type="text" id="happydate" placeholder=" " value="12/09/1986" readonly>
                        <label for="ciudad">Fecha de nacimiento</label>
                    </div>
                    <div class="inputs">
                        <input type="text" id="firma" placeholder=" " value="File" readonly>
                        <label for="pais">Firma digital</label>
                    </div>
                    <div class="inputs">
                        <input type="text" id="permisos" placeholder=" " value="1" readonly>
                        <label for="permisos">Cantidad de permisos económicos restantes</label>
                    </div>
                </div>
                <div class="botones">
                    <button>Cambiar contraseña</button>
                    <button>Editar firma digital</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.container-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.carta {
    position: relative;
    width: 60%;
    padding: 20px;
    border: 2px solid #fff;
    border-radius: 10px;
    background-color: #f9f9f9;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.carta h1 {
    color: #333;
}

.carta p {
    color: #a9a9a9;
    line-height: 1.6;
}

.formulario {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
}

.formulario .columna {
    flex: 0 1 calc(50% - 10px); /* Ajustar el ancho de la columna */
    margin-bottom: 20px;
}

.formulario .inputs {
    margin-bottom: 15px;
    position: relative;
    margin-right: 18px;
}

.formulario .inputs input {
    width: calc(100% - 24px); /* Ajustar el ancho del input */
    padding: 20px;
    margin-bottom: 10px;
    border: 1px solid #1B365D;
    border-radius: 10px;
}

.formulario .inputs input:focus {
    border-color: #FCBF12;
    outline: none;
}

.formulario .inputs label {
    position: absolute;
    top: 10px;
    left: 10px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
    pointer-events: none;
    transition: all 0.3s ease;
}

.formulario .inputs input:focus + label,
.formulario .inputs input:not(:placeholder-shown) + label {
    top: -15px;
    left: 0;
    font-size: 12px;
    color: #1B365D;
}

.botones {
    display: flex;
    justify-content: center;
    flex: 0 1 100%; /* Ajustar el ancho de los botones */
}

.botones button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 5px;
    background-color: #1B365D;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.botones button:hover {
    background-color: #385979;
}

/* Estilos para la foto de perfil circular */
.perfil {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 20px; /* Centro y espacio debajo */
}

.perfil img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>