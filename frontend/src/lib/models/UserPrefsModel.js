import subDays from "date-fns/subDays";
import subMonths from "date-fns/subMonths";
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

    selectors:
      formattedSelectedPeriod: Selector to get the current selected period label (string)

*/
export default {
  name: "UserPrefsModel",
  state: {
    user: null,
    selectedPeriod: PeriodEnum.THIRTY_DAYS,
    fromDate: subDays(new Date(), 30),
    toDate: new Date(),
  },
  reducers: {
    setUser(state, payload) {
      return { ...state, user: payload };
    },
    setSelectedPeriod(state, payload) {
      if (payload.selectedPeriod != null)
        if (Object.values(PeriodEnum).includes(payload.selectedPeriod)) {
          let fromDate;
          let toDate;

          // Set fromDate and toDate
          switch (payload.selectedPeriod) {
            case PeriodEnum.SEVEN_DAYS:
              fromDate = subDays(new Date(), 7);
              toDate = new Date();
              break;
            case PeriodEnum.THIRTY_DAYS:
              fromDate = subDays(new Date(), 30);
              toDate = new Date();
              break;
            case PeriodEnum.NINETY_DAYS:
              fromDate = subDays(new Date(), 90);
              toDate = new Date();
              break;
            case PeriodEnum.TWELVE_MONTHS:
              fromDate = subMonths(new Date(), 12);
              toDate = new Date();
              break;
            case PeriodEnum.CUSTOM:
              // If the selected period is custom, we want to use the provided fromDate and toDate via the payload parameter
              if (payload.fromDate && payload.toDate) {
                if (fromDate >= toDate) {
                  const aux = toDate;
                  fromDate = toDate;
                  toDate = aux;
                }

                fromDate = payload.fromDate;
                toDate = payload.toDate;
              }
              break;
            default:
              return state;
          }

          // Save state if the calculated fromDate and toDate are valid
          if (fromDate && toDate) {
            return {
              ...state,
              selectedPeriod: payload.selectedPeriod,
              fromDate,
              toDate,
            };
          }
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
