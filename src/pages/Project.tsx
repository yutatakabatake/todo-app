import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { Button } from '@mui/material';

function Project() {
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }
    const { tasks, projects, setTasks, setProjects } = context;

    return (
        <div className="flex-1 overflow-hidden flex">
            <div className="w-80 bg-white border-r overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-4 z-10">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">Projects</h2>
                        <Button
                            variant='contained'
                            color='success'
                            onClick={() => alert('add')}>
                            New
                        </Button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="text-center py-8 text-gray-400 text-sm">
                        <p>No projects</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50">
                <div className="p-6">
                    <div className="max-w-4xl mx-auto">

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">すべてのタスク</h2>
                            <p className="text-sm text-gray-500">
                                プロジェクト別にタスクを管理
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Project