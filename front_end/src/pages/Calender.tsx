import { Button } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MonthView from "../components/MonthView";

function Calender() {

    return (
        <div className="flex-1 overflow-hidden flex flex-col">
            <div className="bg-white border-b px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold">Calender</h2>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outlined"
                                sx={{
                                    minWidth: 0,
                                    padding: 0,
                                    lineHeight: 1,
                                    borderColor: '#0000001f',
                                    color: '#000000'
                                }}>
                                <ChevronLeftIcon />
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    minWidth: 0,
                                    lineHeight: 1,
                                    borderColor: '#0000001f',
                                    color: '#000000'
                                }}>
                                TODAY
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    minWidth: 0,
                                    padding: 0,
                                    lineHeight: 1,
                                    borderColor: '#0000001f',
                                    color: '#000000'
                                }}>
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <MonthView />
            </div>
        </div>
    )
}

export default Calender