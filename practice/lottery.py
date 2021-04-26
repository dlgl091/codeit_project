from random import randint

def generate_numbers(n):
    numbers=[]
    while len(numbers)<n:
        num=randint(1,45)
        if num not in numbers:
            numbers.append(num)
    return numbers

def generate_numbers(n):
    numbers=[]
    while len(numbers)<n:
        num=randint(1,45)
        if num not in numbers:
            numbers.append(num)
    return numbers

def draw_winning_numbers():
    new_numbers=generate_numbers(7)
    return sorted(new_numbers[:6])+new_numbers[6:]

def count_matching_numbers(numbers, winning_numbers):
    count=0
    for i in numbers:
        if i in winning_numbers:
            count+=1
    return count

def check(numbers, winning_numbers):
    list_3=[]
    winning_last=[]
    matching_num=0
    list_3=list(winning_numbers[0:6])
    matching_num=count_matching_numbers(numbers,list_3)
    winning_last.append(winning_numbers[6])
    if matching_num==6:
        return 1000000000
    elif matching_num==5 and count_matching_numbers(winning_last,numbers)==1:
        return 50000000
    elif matching_num==5:
        return 1000000
    elif matching_num==4:
        return 50000
    elif matching_num==3:
        return 5000
    elif matching_num<3 and count_matching_numbers(winning_last,numbers)==1:
        return 0
    elif matching_num<3 and count_matching_numbers(winning_last,numbers)==0:
        return 0