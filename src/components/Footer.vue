<script setup>
</script>

<template>
    <footer class="main-footer">
        <div class="footer_">
            <div class="footer-content">
                <div class="footer-text">
                    <div>© 2024 Copyright Universidad Autónoma de Campeche.</div>
                    <div>Desarrollado por Zeleris Team</div>
                </div>
                <div class="containerContact">
                    <div id="contactmail" style="display: flex;">
                        <i id="iconContact" class="bi bi-envelope-at"></i>
                        <label id="labelContact_1">Contactanos: al066225@uacam.mx</label>
                    </div>
                    <div id="contactphone" style="display: flex;">
                        <i class="bi bi-telephone"></i>
                        <label id="labelContact_2">Llamanos: +52 1 938 255 2500</label>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.main-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.footer_ {
    width: 100%;
    min-height: 50px;
    border-top: 1px solid var(--grayy);
    background-color: white;
    color: var(--grayy);
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
}

.containerContact {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 60px;
    color: black;
    padding: 5px;
}
#contactmail{
    text-align: center;

}
#labelContact_1{
    font-size: 13px;
    margin-left: 8px;
    text-align: center;
    padding-top: 5px;
}
#labelContact_2{
    font-size: 13px;
    margin-left: 8px;
    text-align: center;
}

#iconContact {
    font-size: 20px;
    color: black;
}

.footer-text {
    flex-grow: 1;
    text-align: center;
    font-size: 14px;
    margin-left: 250px;
    user-select: none;
}
</style>