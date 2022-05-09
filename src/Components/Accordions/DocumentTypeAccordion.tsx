import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useState} from "react";
import {IDocumentType} from "../../Redux/Document/Document-interfaces";
import {Button, TextField} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
    deleteDocumentType: (id: number) => void
    addDocumentType: (documentType: IDocumentType) => void
    documentTypes: IDocumentType[] | []
}

export default function DocumentTypeAccordion({deleteDocumentType, addDocumentType, documentTypes}: Props) {

    const [isVisibleTypeForm, setIsVisibleTypeForm] = useState(false)
    const [documentTypeText, setDocumentTypeText] = useState('')


    return <Accordion style={{backgroundColor: '#dff8df'}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel2a-content"
            id="panel2a-header"
        >
            <Typography>Типы документов</Typography>
        </AccordionSummary>
        <AccordionDetails>

            <div>
                {documentTypes.map((x, index) =>
                    <Button onClick={() => deleteDocumentType(x.id)}
                            style={{marginLeft: '5px'}}
                            variant={'contained'}
                            key={index}
                            endIcon={<DeleteForeverIcon/>}>
                        <Typography>{x.documentType}</Typography>
                    </Button>
                )}
            </div>

            <div>

                {!isVisibleTypeForm &&
                <Button style={{margin: '15px 0px 0px 5px'}}
                        variant={'outlined'}
                        onClick={() => setIsVisibleTypeForm(true)}
                >
                    Добавить тип документа
                </Button>}

                {isVisibleTypeForm &&
                <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="type"
                        label='Тип документа'
                        autoComplete="type"
                        autoFocus
                        onChange={(e) => setDocumentTypeText(e.target.value)}
                    />
                    <Button variant={'outlined'} onClick={() => {
                        addDocumentType({id: Math.random(), documentType: documentTypeText});
                        setIsVisibleTypeForm(false)
                    }}
                    >
                        Добавить
                    </Button>
                </div>}


            </div>

        </AccordionDetails>
    </Accordion>


}
