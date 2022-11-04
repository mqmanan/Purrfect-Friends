const [ arrayToFilter, setArrayToFilter ] = useState([ /*array of objects to apply filters to*/ ]);
const [ filteredResults, setFilteredResults] = useState([ /*array of filtered objects*/ ]);
const [ categoryOptions, setCategoryOptions ] = useState([ 1,2,3 ]);
const [ selectedCategoryOptions, setSelectedCategoryOptions ] = useState([ ]);
const [ searchName, setSearchName ] = useState('');
const [ hideVenuesWithoutDiscounts, setHideVenuesWithoutDiscounts ] = useState(true);

const filterHideVenuesWithoutDiscounts = () => 
{
    if(hideVenuesWithoutDiscounts)
    {
        return arrayToFilter.filter(item => item.discounts.length > 0);
    }
    else
    {
        return arrayToFilter;
    }   
};

const filterSelectedCategoryOptions = () => 
{
    return arrayToFilter.filter(item => item.category_id.includes(selectedCategoryOptions));
};

const filtersearchName = () => 
{
    return arrayToFilter.filter(item =>  item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1);
};

useEffect(() => 
{
    //Filter options updated so apply all filters here
},
[searchName, hideVenuesWithoutDiscounts, selectedCategoryOptions]);

const filterHideVenuesWithoutDiscounts = (array) => {
    if (hideVenuesWithoutDiscounts) {
        return array.filter((item) => item.discounts.length > 0);
    } else {
        return array;
    }
};

const filterSelectedCategoryOptions = (array) => {
    return array.filter((item) => item.category_id.includes(selectedCategoryOptions));
};

const filtersearchName = (array) => {
    return array.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1);
};

useEffect(() => {
    //Filter options updated so apply all filters here
    let result = arrayToFilter;
    result = filterHideVenuesWithoutDiscounts(result);
    result = filterSelectedCategoryOptions(result);
    result = filtersearchName(result);
    setArrayToFilter(result);
}, [searchName, hideVenuesWithoutDiscounts, selectedCategoryOptions]);
