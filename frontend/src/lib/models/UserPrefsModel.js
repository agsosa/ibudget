import { subDays, subMonths, format } from "date-fns";
import { getPeriodLabel } from "lib/Helpers";
import { PeriodEnum } from "lib/Enums";

/*
  UserPrefsModel
      { 
        selectedPeriod: value of PeriodEnum
        fromDate: js date
        toDate: js date
      }

    reducers:
      setSelectedPeriod(payload)
        Payload: { selectedPeriod: value of PeriodEnum, fromDate: should be a valid JS date if period is PeriodEnum.CUSTOM, toDate: same as fromDate}
        Update selectedPeriod, fromDate and toDate fields. fromDate and toDate will be calculated depending on the passed selectedPeriod via payload.

    selectors:
      formattedSelectedPeriod: Selector to get the current selected period label (string) 
                                (for selectedPeriod = PeriodEnum.CUSTOM it will return something like "11/04/2021 - 12/04/2021")

*/
export default {
  name: "UserPrefsModel",
  state: {
    selectedPeriod: PeriodEnum.THIRTY_DAYS,
    fromDate: null,
    toDate: null,
  },
  reducers: {
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
    formattedSelectedPeriod() {
      return createSelector(slice, (state) => {
        if (
          state.selectedPeriod === PeriodEnum.CUSTOM &&
          state.fromDate &&
          state.toDate
        ) {
          const fromDateFormatted = format(state.fromDate, "dd/MM/yy");
          const toDateFormatted = format(state.toDate, "dd/MM/yy");
          return `${fromDateFormatted} - ${toDateFormatted}`;
        }

        return getPeriodLabel(state.selectedPeriod);
      });
    },
  }),
};
