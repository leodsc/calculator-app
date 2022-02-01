import { ReactComponent as ClearSymbolIcon } from './images/ClearSymbol.svg';
import { ReactComponent as FutureIcon } from './images/Future.svg';
import { ReactComponent as LaboratoryIcon } from './images/Laboratory.svg';
import { ReactComponent as RestartIcon } from './images/Restart.svg';

const icons = [
  {
    svg: LaboratoryIcon,
    action: function () {
      console.log('oi');
    }
  },
  {
    svg: FutureIcon,
    action: function () {
      console.log('oi');
    }
  },
  {
    svg: RestartIcon,
    action: function () {
      console.log('oi');
    }
  },
  {
    svg: ClearSymbolIcon,
    action: function (position = null, expression = null) {
      if (expression[position - 1] !== undefined && // short circuit to prevent bug
        // if click on position 0 of the screen and click again in erase
        expression[position - 1].length > 0) {
        const stack = expression.split("");
        stack.splice(position - 1, 1);
        return stack.join("");
      } else return expression;
    }
  }
]

export default icons;