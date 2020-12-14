import PierSansRegular from './PierSans-Regular.otf';
import PierSansBold from './PierSans-Bold.otf';


const pierSansRegularFont = {
    fontFamily: 'Pier-Sans',
    fontWeight: 400,
    fontSize: 16,
    src: `local('PierSans-Regular'),
        url(${PierSansRegular}) format ('otf')`,
}

const pierSansBoldFont = {
    fontFamily: 'Pier-Sans',
    fontWeight: 'bold',
    fontSize: 16,
    src: `local('PierSans-Bold'),
        url(${PierSansBold}) format ('otf')`,
}

const fontArray = [pierSansRegularFont, pierSansBoldFont];
export default fontArray;