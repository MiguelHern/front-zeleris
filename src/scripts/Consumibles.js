export const APIS = {

    CrearDocente: async (name, lastName, rol, quantityPermissions, matricula, dependencyId, email, password) => {

        const data = {
            name: name,
            lastName: lastName,
            rol: rol,
            quantityPermissions: quantityPermissions,
            matricula: matricula,
            dependencyId: dependencyId,
            credentials: {
                email: email,
                password: password
            }
        };

        const token = localStorage.token;

        const response = await fetch(`${import.meta.env.VITE_MANAGER_API_URL}/admin/Employees`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(response)
    }

}