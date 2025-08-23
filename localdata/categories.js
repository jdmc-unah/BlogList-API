	
    const categories = [
      {
        value: 'Arte',
        label: 'Arte',
      },
      {
        value: 'Finanzas ',
        label: 'Finanzas ',
      },
      {
        value: 'Gastronomía',
        label: 'Gastronomía',
      },
      {
        value: 'Negocios ',
        label: 'Negocios ',
      },
      {
        value: 'Noticias',
        label: 'Noticias',
      },
      {
        value: 'Tecnología',
        label: 'Tecnología',
      },
      {
        value: 'Viajes',
        label: 'Viajes',
      },
      
    ];


    const findCat = (cat)=>{
      return categories.find((category) => {category == cat} )
    }

     


module.exports = { categories, findCat}