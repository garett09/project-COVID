import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

function Vaccinebox({ title, totalVaccinated, peopleVaccinated, peopleFullyVaccinated}) {
    return (
        <Card className="vaccineBox">
            <CardContent>
                {/*title*/}
                <Typography classname="vaccineBox__title" color="textSecondary">
                    {title}</Typography>

                <h2 className="vaccineBox__total">{totalVaccinated} people vaccinated</h2>
                {/*cases*/}
                <Typography classname="vaccineBox__peopleVaccinated" color="textSecondary">
                    {peopleVaccinated} 
                </Typography>

                <Typography classname="vaccineBox__peopleFullyVaccinate" color="textSecondary">
                    {peopleFullyVaccinated} 
                </Typography>
                {/*total*/}
            </CardContent>
        </Card>
    )
}

export default Vaccinebox
