module.exports = function() {
    const patients = [
        { name: 'bob', age: 20, unit: 'unit-1' },
        { name: 'james', age: 30, unit: 'unit-1' },
        { name: 'john', age: 40, unit: 'unit-2' },
        { name: 'jim', age: 50, unit: 'unit-3' }
    ];

    const drugs = [
        { drug: 'drug-1', price: 50, instock: 20 },
        { drug: 'drug-2', price: 100, instock: 20 },
        { drug: 'drug-3', price: 150, instock: 20 },
        { drug: 'drug-4', price: 200, instock: 20 }
    ];

    const prescriptions = [
        // { drug: 'drug-1', patient_name: "bob", dosage: "100 mg/day x 2"  },
        // { drug: 'drug-2', patient_name: "bob", dosage: "100 mg/day x 2"  },
        // { drug: 'drug-3', patient_name: "james", dosage: "100 mg/day x 2"  },
        // { drug: 'drug-4', patient_name: "jim", dosage: "100 mg/day x 2"  }
    ];

    const orders = [
        // { patient_name: 'tedo', date: '12-12-2022', time: '12:15', status: 'fulfilled' }, // pending, fulfilled
    ];


    const facilities = [
        { name: 'facility-1', address: '', phone: '1234' },
        { name: 'facility-2', address: '', phone: '1234' },
        { name: 'facility-3', address: '', phone: '1234' },
        { name: 'facility-4', address: '', phone: '1234' }
    ];

    const units = [
        { name: 'unit-1', facility: 'facility-1' },
        { name: 'unit-2', facility: 'facility-1' },
        { name: 'unit-3', facility: 'facility-2' },
        { name: 'unit-4', facility: 'facility-3' }
    ];

    return {
        patients,
        drugs,
        facilities,
        units,
        prescriptions,
        orders
    }
}