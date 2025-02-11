
import {Button, Table, TableBody, TableRow, TableHead, TableCell, styled} from '@mui/material';
import { categories } from '../../constants/data.jsx';


const StyledTable = styled(Table)`
    border: 1px solid rgba(224,224,224,1)
`;

const StyledButton = styled(Button)`
    margin:20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
`;

categories().map(category => (
    console.log(category.id + " "+ category.value)
))
const Categories = () => {
    return(
        <>
            <Button varient="contained">Create Blog</Button>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            All Categories
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        
                        // We are bringing all the categories from the data.jsx file and we are 
                        // mapping each category by creating a new table row and cell.
                        categories().map(category => (
                            // Now whenever we use .map() function in React, it will ask for a unique key to identify each element
                            // off the map so that it can update whatever is necessary and not everything.
                            // We already have a unique key which is  the id of the category

                            <TableRow key={category.id}>
                                {/* Since hard coding every category is a bad example. we will create a file Name
                                data.jsx in constant folder and use that to loop through */}
                                <TableCell>
                                    {category.type}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>

        </>
    )
}

export default Categories;