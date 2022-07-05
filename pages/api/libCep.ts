interface GetAddressProps {
    cep: string;
}

export type CepResponse = {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    provider: string;
}

interface ViaCepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

interface CorreiosResponse {
    status: string;
    ok: string;
    code: string;
    state: string;
    city: string;
    district: string;
    address: string;
    statusText: string;
}

export const libCep = {
    async getAddress(cep: string){
        const response2 = await fetch(`https://ws.apicep.com/busca-cep/api/cep/${cep}.json`, { method: 'GET', mode: 'cors' });
        const response1 = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { method: 'GET', mode: 'cors' });

        if(response1.status === 200){
            const json = await response1.json();
            if(json.erro == "true"){
                throw new Error("Cep não encontrado")
            } else {
                const format = formatResponseViaCep(json);
                return format
            }
        }

        if(response2.status === 200){
            const json = await response2.json();

            if(json.stauts !== 200){
                throw new Error("Cep não encontrado");
            }

            const format = formatResponseApiCep(json);
            return format
        }

  }
}

function formatResponseViaCep(data: ViaCepResponse){
    const cepResponseFormatedd: CepResponse = {
        cep: data.cep,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        provider: "ViaCep"
    }
    return cepResponseFormatedd;
}

function formatResponseApiCep(data: CorreiosResponse){
    const cepResponseFormatedd: CepResponse = {
        cep: data.code,
        street: data.address,
        neighborhood: data.district,
        city: data.city,
        state: data.state,
        provider: "ApiCep"
    }

    return cepResponseFormatedd
}