import sys
import numpy as np


def main():
    if len(sys.argv) != 2:
        print("Usage: python app.py <number>")
        return

    try:
        num = float(sys.argv[1])
        result = np.square(num)
        print(result)
    except ValueError:
        print("Veuillez entrer un nombre valide.")


if __name__ == "__main__":
    main()