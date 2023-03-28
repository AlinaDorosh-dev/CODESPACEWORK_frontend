const workdayItems = [
  { value: "Jornada Completa", label: "Jornada Completa" },
  { value: "Media Jornada", label: "Media Jornada" },
];

const modalityItems = [
  { value: "Presencial", label: "Presencial" },
  { value: "Remoto", label: "Remoto" },
  { value: "Híbrido", label: "Híbrido" },
];

const countryItems = [
  { value: "España", label: "España" },
  { value: "EEUU", label: "EEUU" },
  { value: "Alemania", label: "Alemania" },
  { value: "Reino Unido", label: "Reino Unido" },
  { value: "Francia", label: "Francia" },
  { value: "Italia", label: "Italia" },
];

const cityItems = [
  { value: "Málaga", label: "Málaga" },
  { value: "Álava", label: "Álava" },
  { value: "Albacete", label: "Albacete" },
  { value: "Alicante", label: "Alicante" },
  { value: "Almería", label: "Almería" },
  { value: "Asturias", label: "Asturias" },
  { value: "Ávila", label: "Ávila" },
  { value: "Badajoz", label: "Badajoz" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Burgos", label: "Burgos" },
  { value: "Cáceres", label: "Cáceres" },
  { value: "Cádiz", label: "Cádiz" },
  { value: "Cantabria", label: "Cantabria" },
  { value: "Castellon", label: "Castellon" },
  { value: "Ciudad Real", label: "Ciudad Real" },
  { value: "Córdoba", label: "Córdoba" },
  { value: "Cuenca", label: "Cuenca" },
  { value: "Gerona", label: "Gerona" },
  { value: "Granada", label: "Granada" },
  { value: "Guadalajara", label: "Guadalajara" },
  { value: "Guipúzcoa", label: "Guipúzcoa" },
  { value: "Huelva", label: "Huelva" },
  { value: "Huesca", label: "Huesca" },
  { value: "Islas Baleares", label: "Islas Baleares" },
  { value: "Jaén", label: "Jaén" },
  { value: "La Coruña", label: "La Coruña" },
  { value: "La Rioja", label: "La Rioja" },
  { value: "Las Palmas", label: "Las Palmas" },
  { value: "León", label: "León" },
  { value: "Lérida", label: "Lérida" },
  { value: "Lugo", label: "Lugo" },
  { value: "Madrid", label: "Madrid" },
  { value: "Murcia", label: "Murcia" },
  { value: "Navarra", label: "Navarra" },
  { value: "Orense", label: "Orense" },
  { value: "Palencia", label: "Palencia" },
  { value: "Pontevedra", label: "Pontevedra" },
  { value: "Salamanca", label: "Salamanca" },
  { value: "Santa Cruz de Tenerife", label: "Santa Cruz de Tenerife" },
  { value: "Segovia", label: "Segovia" },
  { value: "Sevilla", label: "Sevilla" },
  { value: "Soria", label: "Soria" },
  { value: "Tarragona", label: "Tarragona" },
  { value: "Teruel", label: "Teruel" },
  { value: "Toledo", label: "Toledo" },
  { value: "Valencia", label: "Valencia" },
  { value: "Valladolid", label: "Valladolid" },
  { value: "Vizcaya", label: "Vizcaya" },
  { value: "Zamora", label: "Zamora" },
  { value: "Zaragoza", label: "Zaragoza" },
];

const categoryItems = [
  { value: "Desarrollador Web", label: "Desarrollador Web" },
  { value: "Desarrollador Móvil", label: "Desarrollador Móvil" },
  { value: "Data Science", label: "Data Science" },
  { value: "UX/UI", label: "UX/UI" },
  { value: "DevOps", label: "DevOps" },
  { value: "Ciberseguridad", label: "Ciberseguridad" },
  { value: "Marketing", label: "Marketing" },
  { value: "Ventas", label: "Ventas" },
  { value: "Otros", label: "Otros" },
];

const jodData = {
  modalityItems: modalityItems,
  countryItems: countryItems,
  cityItems: cityItems,
  categoryItems: categoryItems,
  workdayItems: workdayItems,
};

export class Job {
  constructor(data) {
    if (data) {
      this._id = data._id;
      this.title = data.title;
      this.location = {};
      this.location.city = data.location?.city;
      this.location.country = data.location?.country;
      this.salary = data.salary;
      this.jobType = data.jobType;
      this.specialtyJob = data.specialtyJob;
      this.description = data.description;
      this.workDay = data.workDay;
      this.applicants = data.applicants;
      this.company = data.company;
      this.createdAt = data.createdAt;
    }
  }
  static getJobData() {
    return jodData;
  }
  getCompanyLogo() {
    return this.company && this.company.logo
      ? "http://localhost:8000/employer/logo/" +
          encodeURIComponent(this.company.logo)
      : undefined;
  }
}
