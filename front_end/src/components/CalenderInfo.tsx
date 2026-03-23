import dayjs from "dayjs";

type Props = {
    date: dayjs.Dayjs
    toggle: boolean
}

function CalenderInfo(props: Props) {
    const { date, toggle } = props;

    const info = toggle ?
        `${date.format('YYYY')} ${date.format('MMMM')}` :
        `${date.startOf('week').format('YYYY/MM/DD')} - ${date.endOf('week').format('YYYY/MM/DD')}`;

    return (
        <div className="bg-white z-10 border-b px-6 py-2 sticky top-0">
            <h3 className="text-xl font-semibold">
                {info}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Done tasks</p>
        </div>
    )
}

export default CalenderInfo