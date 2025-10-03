import { call, put, takeLatest, all } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { fetchExternalData, setExternalData, setLoading } from "./todosSlice";
import { fetchWorldTimeData, setWorldTimeData, setWorldTimeLoading } from "./todosSlice";

// function* handleFetchExternalData() {
//   try {
//     yield put(setLoading(true));
//     // Ambil data negara (aman CORS): name, capital, population, region
//     const res: AxiosResponse = yield call(() =>
//       axios.get("https://jsonplaceholder.typicode.com/users", { timeout: 10000 })
//     );
//     const mapped = (res.data || []).map((u: any) => ({
//       name: u?.name,
//       email: u?.email,
//       company: u?.company?.name,
//       city: u?.address?.city,
//       website: u?.website,
//     }));
//     yield put(setExternalData(mapped));
//   } catch (e) {
//     yield put(setExternalData({ error: "Failed to fetch public users data" }));
//   } finally {
//     yield put(setLoading(false));
//   }
// }

function fetchTimeForZone(zone: string) {
    // Prioritas: worldtimeapi -> fallback: timeapi.io
    return axios
        .get(`https://worldtimeapi.org/api/timezone/${zone}`, { timeout: 8000 })
        .then((res) => ({
            timezone: res.data?.timezone ?? zone,
            datetime: res.data?.datetime,
            utc_offset: res.data?.utc_offset,
            day_of_week: res.data?.day_of_week,
            week_number: res.data?.week_number,
        }))
        .catch(async () => {
            const r = await axios.get(
                `https://timeapi.io/api/Time/current/zone?timeZone=${encodeURIComponent(zone)}`,
                { timeout: 8000 }
            );
            return {
                timezone: r.data?.timeZone ?? zone,
                datetime: r.data?.dateTime,
                utc_offset: r.data?.timeZone, // tidak ada offset di timeapi.io; pakai nama zona
                day_of_week: r.data?.dayOfWeek,
                week_number: r.data?.week,
            };
        });
}

function* handleFetchWorldTimeData() {
  try {
    yield put(setWorldTimeLoading(true));
    const zones = ["Asia/Jakarta", "Europe/London", "America/New_York", "Asia/Tokyo"];
    const mapped: any[] = yield all(zones.map((z) => call(fetchTimeForZone, z)));
    yield put(setWorldTimeData(mapped));
  } catch (e) {
    yield put(setWorldTimeData([{ error: "Failed to fetch world time data" }]));
  } finally {
    yield put(setWorldTimeLoading(false));
  }
}

export function* todosRootSaga() {
//   yield takeLatest(fetchExternalData.type, handleFetchExternalData);
  yield takeLatest(fetchWorldTimeData.type, handleFetchWorldTimeData);
}