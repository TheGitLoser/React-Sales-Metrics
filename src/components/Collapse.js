import { useState } from "react";
 
import { Box, Typography, Collapse } from '@mui/material';

const MyCollapse = ({ title, content, collapseContent }) => {

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box onClick={handleExpandClick}>
            <Typography variant="subtitle1" gutterBottom color='warning.contrastText'>{title}</Typography>
            <Typography variant="body2" gutterBottom color='info.dark'>{content}</Typography>
            <Collapse in={expanded} timeout="auto">
                {collapseContent}
            </Collapse>
        </Box>
    )
}

export default MyCollapse;