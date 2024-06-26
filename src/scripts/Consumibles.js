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
            }
        };

        const token = localStorage.token;

        try {
            const response = await fetch(`${import.meta.env.VITE_MANAGER_API_URL}/admin/Employees`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return { success: false, data: errorData };
            }

            const responseData = await response.json();
            console.log('Success:', responseData);
            return { success: true, data: responseData };

        } catch (error) {
            console.error('Error:', error);
            return { success: false, error: error.message };
        }
    }
};
