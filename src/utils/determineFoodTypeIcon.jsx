import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faBowlFood, faCarrot, faFaceFrown, faFish, faIceCream, faMortarPestle, faShrimp, faWheatAwn } from '@fortawesome/free-solid-svg-icons';

export const determineFoodTypeIcon = (ingredientType) =>
{
    let selectedIcon;

		switch (ingredientType) {
			case "Gemüse":
				selectedIcon = faCarrot;
				break;
			case "Frucht":
				selectedIcon = faAppleAlt;
				break;
			case "Getreide":
				selectedIcon = faWheatAwn;
				break;
			case "Anderes":
				selectedIcon = faBowlFood;
				break;
			case "Gewürz":
				selectedIcon = faMortarPestle;
				break;
			case "Süßigkeit":
				selectedIcon = faIceCream;
				break;
			case "Meeresfrüchte":
				selectedIcon = faShrimp;
				break;
			case "Fisch":
				selectedIcon = faFish;
				break;
			default:
				selectedIcon = faFaceFrown;
				break;
		}
		return <FontAwesomeIcon icon={selectedIcon} />;
}
