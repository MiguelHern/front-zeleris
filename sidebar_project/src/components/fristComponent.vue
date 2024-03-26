<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    
    <aside>
        <div class="menu">
            <div>
                <button id="button-account">
                    <span class="material-symbols-outlined">
                        account_circle
                    </span>
                </button>

                <button id="button-description">
                    <span class="material-symbols-outlined">
                        description
                    </span>
                </button>

                <button id="button-user">
                    <span class="material-symbols-outlined">
                        person
                    </span>
                </button>

                <button id="button-policies">
                    <span class="material-symbols-outlined">
                        library_books
                    </span>
                </button>
            </div>
        </div>
            

        <div class="menu-logout">
            <div>
                <button id="button-logout">
                    <span class="material-symbols-outlined">
                        logout
                    </span>
                </button>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
  name: 'fristComponent',
  props: {
    msg: String
  }
}
</script>

<style>
.menu{
    height: 100%;
    background-color: white;
    top: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100hv;
}

.menu-logout{
    height: 60px;
    background-color: white;
    top: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100hv;
}

#button-user, #button-account, #button-description, #button-policies, #button-logout{ 
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
    padding: 10px;
}

aside{
    display: flex;
    max-width: 50px;
    min-height: 100vh;
    flex-direction:column;
    background-color: white;
    border-right: 1px solid #758CA3;
}
</style>