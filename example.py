#!/usr/bin/env python3
"""
Example Python script to demonstrate the installed packages.
This script verifies that the key packages from requirements.txt are available.
"""

def check_imports():
    """Check if all required packages can be imported."""
    packages = {
        'flask': 'Flask',
        'requests': 'Requests',
        'pandas': 'Pandas',
        'numpy': 'NumPy',
        'pytest': 'Pytest',
        'black': 'Black',
        'flake8': 'Flake8',
        'dotenv': 'Python-dotenv'
    }
    
    print("Checking installed packages...\n")
    
    for module, name in packages.items():
        try:
            __import__(module)
            print(f"✓ {name} is available")
        except ImportError:
            print(f"✗ {name} is NOT installed")
    
    print("\nNote: To install packages, run:")
    print("pip3 install -r requirements.txt")

if __name__ == "__main__":
    check_imports()
