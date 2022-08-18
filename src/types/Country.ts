import CountryInfo from './CountryInfo';

type Country = {
    active: number;
    activePerOneMillion: number;
    cases: number;
    casesPerOneMillion: number;
    continent: string;
    country: string;
    countryInfo: CountryInfo;
    critical: number;
    criticalPerOneMillion: number;
    deaths: number;
    deathsPerOneMillion: number;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    population: number;
    recovered: number;
    recoveredPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    todayCases: number;
    todayDeaths: number;
    todayRecovered: number;
    updated: number;
};

export default Country;
