export class formatadorInput{
    constructor(){}

    static formatarJuros(valor){
        const numerico = valor.replace(/[^0-9]/g, '');
        const float = parseFloat(numerico) / 100;
        if(isNaN(float)) return '0,00'
        return `${float.toFixed(2)}`;
    };

    static formatarValorMonetario(valor){
        const apenasNumeros = valor.replace(/\D/g, '');
        const valorFloat = parseFloat(apenasNumeros) / 100;
        
        if (isNaN(valorFloat)) return 'R$ 0,00';
        
            return `R$ ${valorFloat.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
    };

    static tratandoValoresInput(valor){
        valor = valor.replace('R$', '').replaceAll('.', '').replace(',','.').replace('%', '')
        return parseFloat(valor)
    }

    static  formatandoTelefone(valor){
        const numeros = valor.replace(/\D/g, '').slice(0, 11); // Limita a 11 dígitos

        if (numeros.length <= 2) {
          return `(${numeros}`;
        } else if (numeros.length <= 6) {
          return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
        } else if (numeros.length <= 10) {
          return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
        } else {
          return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
        }
    }

    static formatarCPF(valor) {
      const nums = valor.replace(/\D/g, '').slice(0, 11);
      if (nums.length <= 3) return nums;
      if (nums.length <= 6) return `${nums.slice(0,3)}.${nums.slice(3)}`;
      if (nums.length <= 9) return `${nums.slice(0,3)}.${nums.slice(3,6)}.${nums.slice(6)}`;
      return `${nums.slice(0,3)}.${nums.slice(3,6)}.${nums.slice(6,9)}-${nums.slice(9)}`;
    }

    static formatarCNPJ(valor) {
      const nums = valor.replace(/\D/g, '').slice(0, 14);
      if (nums.length <= 2) return nums;
      if (nums.length <= 5) return `${nums.slice(0,2)}.${nums.slice(2)}`;
      if (nums.length <= 8) return `${nums.slice(0,2)}.${nums.slice(2,5)}.${nums.slice(5)}`;
      if (nums.length <= 12) return `${nums.slice(0,2)}.${nums.slice(2,5)}.${nums.slice(5,8)}/${nums.slice(8)}`;
      return `${nums.slice(0,2)}.${nums.slice(2,5)}.${nums.slice(5,8)}/${nums.slice(8,12)}-${nums.slice(12)}`;
    }

   // Data: de "dd/MM/yyyy" ou "ddMMyyyy" para "yyyy-MM-dd"
    static tratandoData(valor) {
      // remove tudo que não for dígito
      const nums = valor.replace(/\D/g, '');
      // precisa ter exatamente 8 dígitos (ddMMyyyy)
      if (nums.length !== 8) return '';
      // separa dia, mês e ano
      const dia = nums.slice(0, 2);
      const mes = nums.slice(2, 4);
      const ano = nums.slice(4, 8);
      // retorna no formato ISO para o banco
      return `${ano}-${mes}-${dia}`;
    }

    static formatarCEP(valor) {
      const nums = valor.replace(/\D/g, '').slice(0, 8);
      if (nums.length <= 5) return nums;
      return `${nums.slice(0, 5)}-${nums.slice(5)}`;
    }
}

class fieldPloomes{

  // Tipo de campo decimal 
  ObjectFormat_Decimal(fieldkey, value){
    return {
      FieldKey: fieldkey,
      DecimalValue:formatadorInput.tratandoValoresInput(value)
    }
  }

  ObjectFormat_Date(fieldkey, value){
      return {
      FieldKey: fieldkey,
      DateTimeValue: value
    }
  }

  // Tipo de campo string
  ObjectFormat_String(fieldkey, value){
    return {
      FieldKey: fieldkey,
      StringValue: value
    }
  }

  // Tipo de campo inteiro
  ObjectFormat_Integer(fieldkey, value){
    return {
      FieldKey: fieldkey,
      IntegerValue: value
    }
  }

  ObjectFormat_Key(fieldkey, value){
    return {
      FieldKey: fieldkey,
      BoolValue: value
    }
  }
}

export class Garantidores extends fieldPloomes{
  constructor(Array){
    super()
    this.Dados = Array
  }

  // Quantidade de garantidores
  quantidadeGarantidores(qtd) {
    this.Dados.push(this.ObjectFormat_Integer('deal_11FEABD2-5EC2-4229-A9A8-381792171486', qtd));  // Quantidade de garantidores "OptionsTableId": 31829,
  }

  // Garantidor 1
  garantidorUm(nome, cpf, cnpj, profissao, estadoCivil) {
    this.Dados.push(this.ObjectFormat_String('deal_BBF63223-BAD7-4316-84C8-50051799F12F', nome));         // Garantidor 1 - Nome
    this.Dados.push(this.ObjectFormat_String('deal_50673E76-8C32-48EB-ACB6-B8897DD60D7B', cpf));          // Garantidor 1 - CPF
    this.Dados.push(this.ObjectFormat_String('deal_49C9E291-E75F-4DAA-8AF3-0C53E70C4DD1', cnpj));         // Garantidor 1 - CNPJ
    this.Dados.push(this.ObjectFormat_String('deal_A2CE0ADB-ADF8-4F10-B6B1-84FEE061EBA6', profissao));    // Garantidor 1 - Profissão
    this.Dados.push(this.ObjectFormat_String('deal_767BE4AE-DCE8-45F5-95A7-718DD212DF37', estadoCivil)); // Garantidor 1 - Estado Civil
  }

  // Garantidor 2
  garantidorDois(nome, cpf, cnpj, profissao, estadoCivil) {
    this.Dados.push(this.ObjectFormat_String('deal_59323129-820B-46E2-A562-83AE4B833D44', nome));         // Garantidor 2 - Nome
    this.Dados.push(this.ObjectFormat_String('deal_E3771332-4430-48C9-9AA8-5B84C2DEAA5C', cpf));          // Garantidor 2 - CPF
    this.Dados.push(this.ObjectFormat_String('deal_650C6DF1-BE94-4947-BED6-FB851A6793BE', cnpj));         // Garantidor 2 - CNPJ
    this.Dados.push(this.ObjectFormat_String('deal_90014DFC-D245-4DDD-8216-034BB2CD8D7C', profissao));    // Garantidor 2 - Profissão
    this.Dados.push(this.ObjectFormat_String('deal_C3709E53-3EFF-4598-9008-D17D09AD45AF', estadoCivil)); // Garantidor 2 - Estado Civil
  }

  // Garantidor 3
  garantidorTres(nome, cpf, cnpj, profissao, estadoCivil) {
    this.Dados.push(this.ObjectFormat_String('deal_65BD8034-426F-404D-951D-A2889AC8F009', nome));         // Garantidor 3 - Nome
    this.Dados.push(this.ObjectFormat_String('deal_74034139-270D-44FF-943B-AD2AFCD8C6A5', cpf));          // Garantidor 3 - CPF
    this.Dados.push(this.ObjectFormat_String('deal_7D09BAF8-3042-4917-A51B-F5A7C5E6C2CC', cnpj));         // Garantidor 3 - CNPJ
    this.Dados.push(this.ObjectFormat_String('deal_E12C3713-07B5-4366-9388-BC33B2E0444B', profissao));    // Garantidor 3 - Profissão
    this.Dados.push(this.ObjectFormat_String('deal_28E040B2-151E-40EC-89BD-4461013D6A72', estadoCivil)); // Garantidor 3 - Estado Civil
  }

  // Garantidor 4
  garantidorQuatro(nome, cpf, cnpj, profissao, estadoCivil) {
    this.Dados.push(this.ObjectFormat_String('deal_C782E8E9-79EA-4F58-8501-419BE16EB85C', nome));         // Garantidor 4 - Nome
    this.Dados.push(this.ObjectFormat_String('deal_BD082B4E-98C4-4F22-B9FF-37B507A198EA', cpf));          // Garantidor 4 - CPF
    this.Dados.push(this.ObjectFormat_String('deal_081A4E2B-A486-48E6-9FA8-9FAB568E9603', cnpj));         // Garantidor 4 - CNPJ
    this.Dados.push(this.ObjectFormat_String('deal_95ABA3BA-FF74-4A7B-946D-B53304462F9F', profissao));    // Garantidor 4 - Profissão
    this.Dados.push(this.ObjectFormat_String('deal_945B0490-EE9F-44BD-AD50-EB58BFB119E9', estadoCivil)); // Garantidor 4 - Estado Civil
  }
}

export class TomadoresDados extends fieldPloomes{
  constructor(Array){
    super()
    this.Dados = Array
  }

  // Renda Informada Total
  rendaInformadaTotal(total) {
    this.Dados.push(this.ObjectFormat_Decimal('deal_31AC18A8-A1FB-4DAB-A400-923F16671F89', total)); // Renda Informada Total
  }

   // Tomador 1
  tomador_um(
    T1_Nome,
    T1_Nascimento,
    T1_PFouPJ,
    T1_CPF,
    T1_CNPJ,
    T1_EstadoCivil,
    T1_Endereco,
    T1_CEP,
    T1_Telefone,
    T1_Email,
    T1_Profissao,
    T1_RendaFormal,
    T1_FormaComprovacaoRendaFormal,
    T1_RendaInformal,
    T1_FormaComprovacaoRendaInformal,
    T1_ProfissaoQualificacao,
    T1_RendaTotalinformada,
  ) {

    this.Dados.push(this.ObjectFormat_Decimal('deal_342BD667-BAAE-42EC-99CB-2A33B4809629', T1_RendaInformal)); // Renda informal (T1)
    this.Dados.push(this.ObjectFormat_Integer('deal_CD4023CD-5AD0-4BF6-9CFD-A6D14B5E7F45', T1_FormaComprovacaoRendaInformal)); // Comprovação informal (T1) ->"OptionsTableId": 31835,
    this.Dados.push(this.ObjectFormat_Integer('deal_598CB204-116D-4356-AE57-C155C2745151', T1_ProfissaoQualificacao)); // Qualificação da profissão (T1) -> "OptionsTableId": 32454,
    this.Dados.push(this.ObjectFormat_Decimal('deal_B5A7412D-35E0-41A8-83B9-29156CA01C31', T1_RendaTotalinformada)); // Renda Total Informada (T1)

    this.Dados.push(this.ObjectFormat_String(
      'deal_21F4435C-B7DF-43E4-8CFD-4C3FDB8F56F3',
      T1_Nome
    )); // Tomador 1 - Nome - OK
    this.Dados.push(this.ObjectFormat_Date(
      'deal_7B66BAAE-4BD9-45DA-BE6E-F90978371721',
      T1_Nascimento
    )); // Tomador 1 - Data de nascimento - OK
    this.Dados.push(this.ObjectFormat_Integer(
      'deal_645BF29A-E989-4124-AC68-5AAAC5FE180A', // -> "OptionsTableId": 47689,
      T1_PFouPJ
    )); // Tomador 1 - PF ou PJ - OK
    this.Dados.push(this.ObjectFormat_String(
      'deal_304CA7AF-E8C8-4006-BC57-6D5FA653FEB5',
      T1_CPF
    )); // Tomador 1 - CPF - OK
    this.Dados.push(this.ObjectFormat_String(
      'deal_E95722A2-7AAE-4EBE-B632-1C954764894C',
      T1_CNPJ
    )); // Tomador 1 - CNPJ - OK
    this.Dados.push(this.ObjectFormat_Integer(
      'deal_BF2A8CBD-B877-4795-BAA4-8440B189725F', // -> "OptionsTableId": 39344,
      T1_EstadoCivil
    )); // Tomador 1 - Estado Civil - OK
    this.Dados.push(this.ObjectFormat_String(
      'deal_F5EB35F5-454B-429D-B225-F73AC913440D',
      T1_Endereco
    )); // Tomador 1 - Endereço - OK
    this.Dados.push(this.ObjectFormat_String(
      'deal_D3DB0085-D110-4DD4-8F90-B80AB46A1316',
      T1_CEP
    )); // Tomador 1 - CEP - OK
    this.Dados.push(this.ObjectFormat_String(
      'deal_0714D25C-11B6-4CB4-81E9-9B0287E59560',
      T1_Telefone
    )); // Tomador 1 - Telefone - OK
    this.Dados.push(this.ObjectFormat_String(
      'deal_24DF886D-B875-4DD0-AF46-93A46B917A72',
      T1_Email
    )); // Tomador 1 - Endereço eletrônico - OK
    this.Dados.push(this.ObjectFormat_String(
      'deal_93CABFAF-B124-4965-B1DC-BADCA70D673B',
      T1_Profissao
    )); // Profissão (T1) - OK
    this.Dados.push(this.ObjectFormat_Decimal(
      'deal_7A1D23F1-9A60-42EE-9567-8D43920660C6',
      T1_RendaFormal
    )); // Renda formal informada (T1) - OK
    this.Dados.push(this.ObjectFormat_Integer(
      'deal_1F0FA3B2-DE81-4A45-B97B-E68B54DA90E5',
      T1_FormaComprovacaoRendaFormal
    )); // Forma de comprovação da renda formal (T1)
  }

  // Tomador 2
  tomador_dois(
    T2_Nome,
    T2_Nascimento,
    T2_PFouPJ,
    T2_CPF,
    T2_CNPJ,
    T2_EstadoCivil,
    T2_Endereco,
    T2_CEP,
    T2_Telefone,
    T2_Email,
    T2_Profissao,
    T2_RendaFormal,
    T2_FormaComprovacaoRendaFormal,
    T2_RendaInformal,
    T2_FormaComprovacaoRendaInformal,
    T2_ProfissaoQualificacao,
    T2_RendaTotalinformada
  ) {

    this.Dados.push(this.ObjectFormat_Decimal('deal_586E216C-C095-45C0-BD40-F33D7EA4F1BD', T2_RendaTotalinformada)); // Renda Total Informada (T1)

    // Renda informal (T2)
    this.Dados.push(
      this.ObjectFormat_Decimal(
        'deal_6A6E970E-716C-4C78-A050-3AD70520E762',
        T2_RendaInformal
      )
    );
    // Comprovação informal (T2)
    this.Dados.push(
      this.ObjectFormat_Integer(
        'deal_707EA962-CBDD-4995-9815-F4098AF0F2BA',
        T2_FormaComprovacaoRendaInformal
      )
    );
    // Qualificação da profissão (T2)
    this.Dados.push(
      this.ObjectFormat_Integer(
        'deal_3216DE9D-B056-409E-8943-B6F0EEE48648',
        T2_ProfissaoQualificacao
      )
    );

    // Tomador 2 - Nome
    this.Dados.push(
      this.ObjectFormat_String(
        'deal_5486BD16-1529-44CC-BF95-5AC4D8135E35',
        T2_Nome
      )
    );
    // Tomador 2 - Data de nascimento
    this.Dados.push(
      this.ObjectFormat_Date(
        'deal_02BD506A-D52A-4B86-A0AC-9ED40F808FEE',
        T2_Nascimento
      )
    );
    // Tomador 2 - PF ou PJ
    this.Dados.push(
      this.ObjectFormat_Integer(
        'deal_BE586E73-5EA3-4F46-840E-43A3E1A11D6E',
        T2_PFouPJ
      )
    );
    // Tomador 2 - CPF
    this.Dados.push(
      this.ObjectFormat_String(
        'deal_A9AC9C2E-633A-480F-8689-C93D930F6847',
        T2_CPF
      )
    );
    // Tomador 2 - CNPJ
    this.Dados.push(
      this.ObjectFormat_String(
        'deal_0C3DA592-AE6D-4DE2-A9B3-A8251CD08F00',
        T2_CNPJ
      )
    );
    // Tomador 2 - Estado Civil
    this.Dados.push(
      this.ObjectFormat_Integer(
        'deal_6C762DFB-D318-48CD-A5BA-83E0E9E30E91',
        T2_EstadoCivil
      )
    );
    // Tomador 2 - Endereço
    this.Dados.push(
      this.ObjectFormat_String(
        'deal_917845AF-B32E-4BCB-9229-9521349BA9AF',
        T2_Endereco
      )
    );
    // Tomador 2 - CEP
    this.Dados.push(
      this.ObjectFormat_String(
        'deal_0AC02E10-596F-4B90-BFBF-F9694A80783F',
        T2_CEP
      )
    );
    // Tomador 2 - Telefone
    this.Dados.push(
      this.ObjectFormat_String(
        'deal_3187E3C5-C66D-4369-BCEF-BB4274528334',
        T2_Telefone
      )
    );
    // Tomador 2 - Endereço eletrônico
    this.Dados.push(
      this.ObjectFormat_String(
        'deal_2203980F-0C6E-4AB8-9C09-71095B4D714A',
        T2_Email
      )
    );
    // Profissão (T2)
    this.Dados.push(
      this.ObjectFormat_String(
        'deal_3159013E-D2B6-4B50-989C-62A2D23F4465',
        T2_Profissao
      )
    );
    // Renda formal informada (T2)
    this.Dados.push(
      this.ObjectFormat_Decimal(
        'deal_F64C3E91-E529-4A0B-98AA-889EF61E3767',
        T2_RendaFormal
      )
    );
    // Forma de comprovação da renda formal (T2)
    this.Dados.push(
      this.ObjectFormat_Integer(
        'deal_8C97D8BC-96D3-4F45-B8A7-C12A37CD8D87',
        T2_FormaComprovacaoRendaFormal
      )
    );
  }

  // Tomador 3
  tomador_tres(
  T3_Nome,
  T3_Nascimento,
  T3_PFouPJ,
  T3_CPF,
  T3_CNPJ,
  T3_EstadoCivil,
  T3_Endereco,
  T3_CEP,
  T3_Telefone,
  T3_Email,
  T3_Profissao,
  T3_RendaFormal,
  T3_FormaComprovacaoRendaFormal,
  T3_RendaInformal,
  T3_FormaComprovacaoRendaInformal,
  T3_ProfissaoQualificacao,
  T3_RendaTotalinformada
) {

  this.Dados.push(this.ObjectFormat_Decimal('deal_F9E8EE3A-92EB-4D36-9F2D-832E59665AF3', T3_RendaTotalinformada)); // Renda Total Informada (T1)

  // Renda informal (T3)
  this.Dados.push(
    this.ObjectFormat_Decimal(
      'deal_FFABC28E-585E-4D44-89F7-332E7B274E33',
      T3_RendaInformal
    )
  );
  // Comprovação informal (T3)
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_7780AF73-F8C9-4D10-B983-CD1125334A03',
      T3_FormaComprovacaoRendaInformal
    )
  );
  // Qualificação da profissão (T3)
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_307A551D-3F1F-4981-BC9F-715C519F3172',
      T3_ProfissaoQualificacao
    )
  );

  // Tomador 3 - Nome
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_13AC257E-433D-4466-92DC-63ED506331F7',
      T3_Nome
    )
  );
  // Tomador 3 - Data de nascimento
  this.Dados.push(
    this.ObjectFormat_Date(
      'deal_E1D40674-38E6-4A24-9DA9-853BBD6E7A91',
      T3_Nascimento
    )
  );
  // Tomador 3 - PF ou PJ
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_00430999-A9E7-4067-978E-4952B7462ED1',
      T3_PFouPJ
    )
  );
  // Tomador 3 - CPF
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_AF1A346F-3AE9-428B-9FF9-A6317AC02FD3',
      T3_CPF
    )
  );
  // Tomador 3 - CNPJ
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_5B70C640-6C0C-48F6-ADA7-F7DE2F0A470D',
      T3_CNPJ
    )
  );
  // Tomador 3 - Estado Civil
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_8910C40F-80B3-4D10-8CFB-6137AD4532DE',
      T3_EstadoCivil
    )
  );
  // Tomador 3 - Endereço
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_F1BEB409-3C18-4660-A956-1B6C9EFA033B',
      T3_Endereco
    )
  );
  // Tomador 3 - CEP
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_9234F18A-C702-4230-97A5-2524CE56D498',
      T3_CEP
    )
  );
  // Tomador 3 - Telefone
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_134A97B6-5591-491C-AAC7-9E272F54FAF5',
      T3_Telefone
    )
  );
  // Tomador 3 - Endereço eletrônico
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_A3998E7A-416C-4B5D-94C3-64AC3E7B7818',
      T3_Email
    )
  );
  // Profissão (T3)
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_EE902978-C537-4B9E-B355-920A6862A2B6',
      T3_Profissao
    )
  );
  // Renda formal informada (T3)
  this.Dados.push(
    this.ObjectFormat_Decimal(
      'deal_7CC88A71-20AC-4FC9-9CCB-1C68393D81A8',
      T3_RendaFormal
    )
  );
  // Forma de comprovação da renda formal (T3)
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_3B79E5C0-EF4F-4194-8A15-ADE3C4DB0885',
      T3_FormaComprovacaoRendaFormal
    )
  );
  }

  // Tomador 4
  tomador_quatro(
    T4_Nome,
    T4_Nascimento,
    T4_PFouPJ,
    T4_CPF,
    T4_CNPJ,
    T4_EstadoCivil,
    T4_Endereco,
    T4_CEP,
    T4_Telefone,
    T4_Email,
    T4_Profissao,
    T4_RendaFormal,
    T4_FormaComprovacaoRendaFormal,
    T4_RendaInformal,
    T4_FormaComprovacaoRendaInformal,
    T4_ProfissaoQualificacao,
    T4_RendaTotalinformada
  ) {

  this.Dados.push(this.ObjectFormat_Decimal('deal_06A7F015-223B-45D7-90F1-25DB6EED1A94', T4_RendaTotalinformada)); // Renda Total Informada (T1)

  // Renda informal (T4)
  this.Dados.push(
    this.ObjectFormat_Decimal(
      'deal_F4ABC681-681A-4E96-BE15-A72C58D635B1',
      T4_RendaInformal
    )
  );
  // Comprovação informal (T4)
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_25291286-3AF7-4F9B-A73B-174BA5A129C2',
      T4_FormaComprovacaoRendaInformal
    )
  );
  // Qualificação da profissão (T4)
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_D28915DE-9DE2-4630-B9B0-EEF0B7D38298',
      T4_ProfissaoQualificacao
    )
  );

  // Tomador 4 - Nome
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_04E6BC3F-595F-46B8-BB56-64F4E11BCE01',
      T4_Nome
    )
  );
  // Tomador 4 - Data de nascimento
  this.Dados.push(
    this.ObjectFormat_Date(
      'deal_C4DA9833-F58A-49FC-BB1A-C1E69F08DE1E',
      T4_Nascimento
    )
  );
  // Tomador 4 - PF ou PJ
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_6DEBCCBF-56B3-49D7-BB39-30127E7D9307',
      T4_PFouPJ
    )
  );
  // Tomador 4 - CPF
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_98CF5047-B79D-43EC-89A8-EA4E6863A24D',
      T4_CPF
    )
  );
  // Tomador 4 - CNPJ
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_D8603767-5A19-46DC-9B88-2F000BD01096',
      T4_CNPJ
    )
  );
  // Tomador 4 - Estado Civil
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_31231CC0-E940-449D-9D0C-925385029C57',
      T4_EstadoCivil
    )
  );
  // Tomador 4 - Endereço
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_44BC66BE-ABDC-4A5F-BA65-99D143E862C1',
      T4_Endereco
    )
  );
  // Tomador 4 - CEP
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_953F41DD-41C2-4288-AE22-29F0F3728AC1',
      T4_CEP
    )
  );
  // Tomador 4 - Telefone
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_25552658-9D0B-4475-9C54-B626EFBE95F6',
      T4_Telefone
    )
  );
  // Tomador 4 - Endereço eletrônico
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_7647BF97-33A0-41E4-AA56-85708E91E673',
      T4_Email
    )
  );
  // Profissão (T4)
  this.Dados.push(
    this.ObjectFormat_String(
      'deal_A133CA66-99A1-46C1-9A70-3021E8FA4B1C',
      T4_Profissao
    )
  );
  // Renda formal informada (T4)
  this.Dados.push(
    this.ObjectFormat_Decimal(
      'deal_8F2ED5A2-5DAC-4003-A0B0-FAD6911DBCBA',
      T4_RendaFormal
    )
  );
  // Forma de comprovação da renda formal (T4)
  this.Dados.push(
    this.ObjectFormat_Integer(
      'deal_78E8778D-1C55-4EEF-A17F-B74C71B8961A',
      T4_FormaComprovacaoRendaFormal
    )
  );
  }

}

export class DemaisInformacoes extends fieldPloomes{
  constructor(Array){
    super()
    this.Dados = Array
  }

  // Campos para Pessoa Jurídica (Ramo)
  camposPessoaJuridica(r1, r2, r3, r4) {
    this.Dados.push(this.ObjectFormat_String('deal_AD1891C5-63C9-4437-9B45-6B3EB8FE6188', r1)); // Ramo (T1 PJ)
    this.Dados.push(this.ObjectFormat_String('deal_333299F6-D8D3-4C9F-9859-CCB1AF34A1B9', r2)); // Ramo (T2 PJ)
    this.Dados.push(this.ObjectFormat_String('deal_4A59AC58-DCA8-4C72-B821-561EA3AEDA23', r3)); // Ramo (T3 PJ)
    this.Dados.push(this.ObjectFormat_String('deal_CC886D3F-52BC-4C34-A6D9-B29147FD0C13', r4)); // Ramo (T4 PJ)
  }

  // Nº de sócios (Pessoa Jurídica)
  numeroSociosPJ(n1, n2, n3, n4) {
    this.Dados.push(this.ObjectFormat_Integer('deal_C53369F4-5A24-4A30-A3EF-D67B93DFFCF7', n1)); // Nº de sócios (T1 PJ)
    this.Dados.push(this.ObjectFormat_Integer('deal_AAF30CB8-456F-4991-8790-640035608665', n2)); // Nº de sócios (T2 PJ)
    this.Dados.push(this.ObjectFormat_Integer('deal_2BC4FEE9-6362-4148-A20F-0E29B4AF1934', n3)); // Nº de sócios (T3 PJ)
    this.Dados.push(this.ObjectFormat_Integer('deal_A5F8F507-D06D-4E43-9A3F-B7643F27DE2B', n4)); // Nº de sócios (T4 PJ)
  }

  // Informações de empréstimo
  informacoesEmprestimo(taxaJuros, valor, prazo, amortizacao, carencia, Qtd_tomadores, RendaTotalInformada) {
    this.Dados.push(this.ObjectFormat_Integer('deal_96CABEAE-B922-468E-B376-81208D1E4DC9', Qtd_tomadores))    // Quantidade de tomadores 
    this.Dados.push(this.ObjectFormat_Decimal('deal_B7411108-97DA-4D62-8FFD-BE0BF309DAD3', taxaJuros));      // Taxa de juros (SOLICITADO)
    this.Dados.push(this.ObjectFormat_Decimal('deal_722F7E80-47E7-40C9-AAC4-2C43130CA707', valor));        // Valor (SOLICITADO)
    this.Dados.push(this.ObjectFormat_Integer('deal_1F5521D3-1324-484C-B4E5-E826C359080F', prazo));      // Prazo (SOLICITADO)
    this.Dados.push(this.ObjectFormat_Integer('deal_EB71244F-6B18-41F3-AC2E-5AA14F777177', amortizacao));   // Amortização (SOLICITADO)
    this.Dados.push(this.ObjectFormat_Integer('deal_4E260047-3B96-4FEF-8DF4-8C9307EC4EE0', carencia));    // Carência (SOLICITADO)
    this.Dados.push(this.ObjectFormat_Decimal('deal_31AC18A8-A1FB-4DAB-A400-923F16671F89', RendaTotalInformada)) // Renda informada Total
  }

  // Finalidade do empréstimo
  finalidadeEmprestimo(motivo, comentarios) {
    this.Dados.push(this.ObjectFormat_String('deal_8BC7EABD-AB70-4EB6-9203-8133EE64691A', motivo));          // Motivo do empréstimo
    this.Dados.push(this.ObjectFormat_String('deal_B45CE0FB-2CD8-49D1-A8CF-FC0B0B425592', comentarios));    // Comentários sobre o motivo (SPIN)
  }

  // Checagem de dívidas
  checagemDividas(iptu, itr, condominio) {
    this.Dados.push(this.ObjectFormat_String('deal_5467F9EB-6EC5-4B2B-9D2C-D2801DBB920F', iptu));         // Dívidas de IPTU?
    this.Dados.push(this.ObjectFormat_String('deal_285725C3-0270-4D16-983C-2BE87C5D587B', itr));          // Dívidas de ITR?
    this.Dados.push(this.ObjectFormat_String('deal_510B1612-5BAD-4EE3-A8F4-6ED6C84B035E', condominio));   // Débitos de Condomínio?
  }

  // Condições de garantia
  condicoesGarantia(
    pertenceTomador,
    valorGarantia,
    cidade,
    quitada,
    ruralUrbano,
    endereco,
    unidadeFederativa,
    matricula,
    nomeNaMatricula,
    averbado,
    usufruto,
    inventario,
    valorEmAberto,
    ComQuemEstaFinanciado,
    QuantoTempoFalta
  ) {
    this.Dados.push(this.ObjectFormat_Integer('deal_B2446B4C-776E-4B39-8C90-54E02BF69398', pertenceTomador));      // A garantia pertence ao tomador?
    this.Dados.push(this.ObjectFormat_Decimal('deal_FA8146ED-FF85-4706-B58E-60E9F24E3C5F', valorGarantia));       // Valor da garantia (SOLICITADO)
    this.Dados.push(this.ObjectFormat_Integer('deal_CF20FE57-AC53-4620-ADAC-7E5BB998B1B8', cidade));              // Cidade da garantia (ALTERADO)
    this.Dados.push(this.ObjectFormat_Key('deal_9D3E7497-34EC-4BE5-9593-4346B2CC0E82', quitada));             // Garantia quitada?
    this.Dados.push(this.ObjectFormat_Integer('deal_73DD1B4C-3B2D-45C9-8B74-73EF963D0A58', ruralUrbano));         // Rural ou urbano
    this.Dados.push(this.ObjectFormat_String('deal_1AA48C68-4279-4AD5-B094-0DA5ED6C5DDB', endereco));           // Endereço da garantia
    this.Dados.push(this.ObjectFormat_Integer('deal_FD4FD389-3AC3-40B0-900D-62641284B58B', unidadeFederativa));   // Unidade federativa
    this.Dados.push(this.ObjectFormat_Key('deal_C5F21FEF-CB57-4B04-90B4-7617BFD79C97', matricula));          // Matrícula/escritura
    this.Dados.push(this.ObjectFormat_Key('deal_5B0F88B4-448E-4911-ABDA-3FD7F126D50B', nomeNaMatricula));   // Nome do garantidor está na matrícula?
    this.Dados.push(this.ObjectFormat_Key('deal_4C751B3D-4086-4519-B26C-74DA1018BB8E', averbado));           // Imóvel averbado?
    this.Dados.push(this.ObjectFormat_Key('deal_A3077788-CB0B-4D43-9B17-6C83047A7A44', usufruto));           // Possui usufruto?
    this.Dados.push(this.ObjectFormat_Key('deal_1FC9032C-3940-4A2A-8243-3BC7310D91A8', inventario));          // Processo de inventário?
    this.Dados.push(this.ObjectFormat_Integer('deal_4E0CE90C-7281-4B27-B5B9-1381FCDD08B6', ComQuemEstaFinanciado)); // Empresa que financiou a garantia
    this.Dados.push(this.ObjectFormat_Integer('deal_3AD58AF6-A86E-43DE-B06B-27CE4C206A78', QuantoTempoFalta)); // Tempo para a quitação da garantia
    this.Dados.push(this.ObjectFormat_Decimal('deal_408A53F0-9F97-4D93-ACA4-B8DC1D337A3D', valorEmAberto)); // 
  }
}

