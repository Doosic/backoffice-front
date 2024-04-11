export class Utils {

  /**
   * defaultValue에 값이 들어있다면 defaultValue를 리턴한다.
   * defaultValue가 빈값이라면 fallbackValue를 리턴한다.
   * fallbackValue가 null또는 undefined라면 빈 문자열("")을 리턴한다.
   */
  getDefaultArgumentValue = (defaultValue, fallbackValue) => {
    return this.isEmpty(defaultValue) ? (fallbackValue ?? "") : defaultValue;
  }

  isEmpty = (value) => {
    return value == undefined || value == null || value == "";
  }
}