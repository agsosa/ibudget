import subDays from "date-fns/subDays";
import lightFormat from "date-fns/lightFormat";
import { getPeriodLabel } from "lib/Helpers";
import { PeriodEnum } from "lib/Enums";

/*
  UserPrefsModel
      { 
        user: UserInfo || null
        selectedPeriod: value of PeriodEnum
        fromDate: js date
        toDate: js date
      }

    reducers:
      setSelectedPeriod(payload)
        Update selectedPeriod, fromDate and toDate fields. fromDate and toDate will be calculated depending on the passed selectedPeriod via payload.
        Payload: 
          { selectedPeriod: value of PeriodEnum, 
            fromDate: should be a valid JS date if the selectedPeriod  is PeriodEnum.CUSTOM, 
            toDate: same as fromDate}
       setUser(payload)
         Replace the current user information (i.e. on login)
         Payload: UserInfo || null
      resetPrefs()
            Set the state to default (useful for logout)

    selectors:
      formattedSelectedPeriod: Selector to get the current selected period label (string)

*/

const defaultPrefs = {
  user: null,
  selectedPeriod: PeriodEnum.THIRTY_DAYS,
  fromDate: subDays(new Date(), 30), // Only used if the selectedPeriod is PeriodEnun.CUSTOM
  toDate: new Date(), // Only used if the selectedPeriod is PeriodEnun.CUSTOM
};

export default {
  name: "UserPrefsModel",
  state: defaultPrefs,
  reducers: {
    setUser(state, payload) {
      return { ...state, user: payload };
    },
    resetPrefs() {
      return defaultPrefs;
    },
    setSelectedPeriod(state, payload) {
      if (payload.selectedPeriod != null)
        if (Object.values(PeriodEnum).includes(payload.selectedPeriod)) {
          let fromDate;
          let toDate;

          if (payload.selectedPeriod === PeriodEnum.CUSTOM) {
            if (payload.fromDate && payload.toDate) {
              if (fromDate >= toDate) {
                const aux = toDate;
                fromDate = toDate;
                toDate = aux;
              }

              fromDate = payload.fromDate;
              toDate = payload.toDate;
            } else {
              // eslint-disable-next-line
              payload.selectedPeriod = PeriodEnum.THIRTY_DAYS; // If we receive a CUSTOM period without valid dates, fallback to thirty days
            }
          }

          return {
            ...state,
            selectedPeriod: payload.selectedPeriod,
            fromDate,
            toDate,
          };
        }

      return state;
    },
  },
  selectors: (slice, createSelector) => ({
    // Returns a label (string) representing the selected period. Returns "dd/MM/yy - dd/MM/yy" if the selectedPeriod is CUSTOM
    formattedSelectedPeriod() {
      return createSelector(slice, (state) => {
        if (
          state.selectedPeriod === PeriodEnum.CUSTOM &&
          state.fromDate &&
          state.toDate
        ) {
          const fromDateFormatted = lightFormat(state.fromDate, "dd/MM/yy");
          const toDateFormatted = lightFormat(state.toDate, "dd/MM/yy");
          return `${fromDateFormatted} - ${toDateFormatted}`;
        }

        return getPeriodLabel(state.selectedPeriod);
      });
    },
  }),
};
