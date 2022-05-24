interface GetAddressProps {
    cep: string;
}

export const libCep = {

    async getAddress(cep: any){
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { method: 'GET', mode: 'cors' });
        const json = await response.json();
        return json;
    }
}