
import {Button, Table, TableBody, TableRow, TableHead, TableCell, styled} from '@mui/material';
import { categories } from '../../constants/data.jsx';

import {Link, useSearchParams} from "react-router-dom";
//useSearchParams is a Client Component hook that lets you read the current URL's query string.

const StyledTable = styled(Table)`
    border: 1px solid rgba(224,224,224,1)
`;

const StyledButton = styled(Button)`
    margin:20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
`;

const Linked = styled(Link)`
    text-decoration:none;
    color:#000;
`;

const StyledCell = styled(TableCell)`
   
    &:hover {
        background-color:#f0f0f0;
        cursor:pointer;
    }
`;


const Categories = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');

    return(
        <>
            {/* we are passing the category and checking if we have a category then we pass an empty string */}
            <Link to={`/create/?category=${category || ''}`} style={{textDecoration:'none'}}>
                <StyledButton varient="contained">Create Blog</StyledButton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <StyledCell>
                            <Linked to='/' align="center"> {/* this will link it to the home page */}
                                All Categories
                            </Linked>
                        </StyledCell>
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
                                <StyledCell style={{}}>
                                    {/* what this will do is that for each category, it will link it to an url
                                    by using the name of the category we are clicking on */}
                                    <Linked to={`/?category=${category.type}`}>
                                        {category.type}
                                    </Linked>
                                </StyledCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>

        </>
    )
}

export default Categories;