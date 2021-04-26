with open('practice/chicken.txt', 'r', encoding='UTF-8') as f:
    sum=0
    for benefit in f:
        gathering=benefit.strip("\n").split(": ")
        sum+=int(gathering[1])

    print(sum/int(benefit.strip("\n").split("일")[0]))

with open('new_file.txt', 'w', encoding='UTF-8') as e:
    e.write("도윤이는\n")
    e.write("멋있엉\n")


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
    elif matching_num==5 and count_matching_numbers(numbers,winning_last)==1:
        return 50000000
    elif matching_num==5:
        return 1000000
    elif matching_num==4:
        return 50000
    elif matching_num==3:
        return 5000


# 테스트
print(check([2, 4, 11, 14, 25, 40], [4, 12, 14, 28, 40, 41, 6]))
print(check([2, 4, 11, 14, 25, 40], [2, 4, 10, 11, 14, 40, 25]))


# 숫자 야구
from random import randint

def generate_numbers():
    numbers = []
    while len(numbers)<3:  # <4면 numbers의 len이 3일때도 반복문이 실행돼서 결국 len(numbers)가 4가 돼버림.
        num=randint(0,9)
        if num not in numbers:
            numbers.append(num)

    print("0과 9 사이의 서로 다른 숫자 3개를 랜덤한 순서로 뽑았습니다.\n")
    return numbers
print(generate_numbers())


def take_guess():
    print("숫자 3개를 하나씩 차례대로 입력하세요.")

    new_guess = []
    nums_range=list(range(0,10))
    n=1
    while len(new_guess)<3:
        answer=input("{}번째 숫자를 입력하세요: ".format(n))
        int_answer=int(answer)
        if int_answer in new_guess:
            print("중복되는 숫자입니다. 다시 입력하세요.")
        elif int_answer not in nums_range:
            print("범위를 벗어나는 숫자입니다. 다시 입력하세요.")
        else:
            new_guess.append(int_answer)
            n+=1

    return new_guess


def get_score(guess, solution):
    strike_count = 0
    ball_count = 0
    n=0
    while n<len(guess):
        if guess[n]==solution[n]:
            strike_count+=1
        elif guess[n] in solution:
            ball_count+=1
        n+=1


    return strike_count, ball_count


# 테스트
s_1, b_1 = get_score([2, 7, 4], [2, 4, 7])
print(s_1, b_1)

s_2, b_2 = get_score([7, 2, 4], [2, 4, 7])
print(s_2, b_2)

s_3, b_3 = get_score([0, 4, 7], [2, 4, 7])
print(s_3, b_3)

s_4, b_4 = get_score([2, 4, 7], [2, 4, 7])
print(s_4, b_4)

# 여기서부터 게임 시작!
ANSWER = generate_numbers()
tries = 0
while True:

    s_5, b_5=get_score(take_guess(),ANSWER)
    print("{}S {}B\n".format(s_5,b_5))
    tries += 1
    if s_5==3:
        break
        
print("축하합니다. {}번 만에 숫자 3개의 값과 위치를 모두 맞추셨습니다.".format(tries))

