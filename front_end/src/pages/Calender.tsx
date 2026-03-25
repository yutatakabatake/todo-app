import { Button } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MonthView from "../components/MonthView";
import dayjs from "dayjs";
import { useState } from "react";

function Calender() {
    const today = dayjs();
    const [currentMonthStartDate, setCurrentMonthStartDate] = useState(today.startOf('month'));

    function handleClickToday() {
        setCurrentMonthStartDate(today.startOf('month'));
    }

    function handleClickNext() {
        setCurrentMonthStartDate(currentMonthStartDate.add(1, 'month'));
    }

    function handleClickPrev() {
        setCurrentMonthStartDate(currentMonthStartDate.subtract(1, 'month'));
    }

    return (
        <div className="flex-1 overflow-hidden flex flex-col">
            <div className="bg-white border-b border-gray-200 px-6 py-3">
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
                                }}
                                onClick={handleClickPrev}>
                                <ChevronLeftIcon />
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    minWidth: 0,
                                    lineHeight: 1,
                                    borderColor: '#0000001f',
                                    color: '#000000'
                                }}
                                onClick={handleClickToday}>
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
                                }}
                                onClick={handleClickNext}>
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <MonthView today={today} monthStartDate={currentMonthStartDate} />
            </div>
        </div>
    )
}

export default Calender