import { Dayjs } from 'dayjs'

export function getCalendarDays(date: Dayjs): Dayjs[] {
    // 1. その月の「最初の日（1日）」と「最後の日」を取得
    const startOfMonth = date.startOf('month');
    const endOfMonth = date.endOf('month');

    // 2. カレンダーの「描画開始日」を取得
    // (1日が含まれる週の日曜日)
    const startDate = startOfMonth.startOf('week');

    // 3. カレンダーの「描画終了日」を取得
    // (末日が含まれる週の土曜日)
    const endDate = endOfMonth.endOf('week');

    // 4. startDate から endDate までを配列に格納
    const calendarDays = [];
    let currentDate = startDate;

    // 終了日を超えるまで1日ずつ足していく
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
        calendarDays.push(currentDate);
        currentDate = currentDate.add(1, 'day');
    }

    return calendarDays;
};