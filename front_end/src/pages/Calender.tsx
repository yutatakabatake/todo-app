import { Button } from "@mui/material"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MonthView from "../components/MonthView";

function Calender() {
    return (
        <>
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold">Calender</h2>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outlined"
                                    sx={{
                                        minWidth: 0,      // 1. 文字が短くても一定の幅を持とうとする性質を消す
                                        padding: 0,       // 2. MUI 標準の上下左右パディングを一旦ゼロにする
                                        lineHeight: 1,    // 3. 行間による上下のズレを防ぐ
                                        borderColor: '#000000',
                                        color: '#000000'
                                    }}>
                                    <ChevronLeftIcon />
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        minWidth: 0,      // 1. 文字が短くても一定の幅を持とうとする性質を消す
                                        lineHeight: 1,    // 3. 行間による上下のズレを防ぐ
                                        borderColor: '#000000',
                                        color: '#000000'
                                    }}>
                                    TODAY
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        minWidth: 0,      // 1. 文字が短くても一定の幅を持とうとする性質を消す
                                        padding: 0,       // 2. MUI 標準の上下左右パディングを一旦ゼロにする
                                        lineHeight: 1,    // 3. 行間による上下のズレを防ぐ
                                        borderColor: '#000000',
                                        color: '#000000'
                                    }}>
                                    <ChevronRightIcon />
                                </Button>
                            </div>
                        </div>

                        <ToggleButtonGroup
                            exclusive>
                            <ToggleButton value="month" aria-label="month">
                                Month
                            </ToggleButton>
                            <ToggleButton value="week" aria-label="week">
                                week
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <MonthView />
                </div>
            </div >
        </>
    )
}

export default Calender