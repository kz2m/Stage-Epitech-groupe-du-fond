
import pygame
import sys
import random

# === Initialisation de pygame ===
pygame.init()

# === Constantes ===
WIDTH, HEIGHT = 600, 600
ROWS, COLS = 3, 3
SQUARE_SIZE = WIDTH // COLS
LINE_WIDTH = 15
CIRCLE_RADIUS = SQUARE_SIZE // 3
CIRCLE_WIDTH = 15
CROSS_WIDTH = 25
SPACE = SQUARE_SIZE // 4

# === Couleurs ===
BG_COLOR = (28, 170, 156)
LINE_COLOR = (23, 145, 135)
CIRCLE_COLOR = (239, 231, 200)
CROSS_COLOR = (66, 66, 66)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# === Initialisation de l'écran ===
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Tic Tac Toe')
screen.fill(BG_COLOR)

# === Plateau de jeu ===
board = [[0 for _ in range(COLS)] for _ in range(ROWS)]

# === ETAPE 1 : Fonctions graphiques ===
circle_img =pygame.image.load("steel_ball_(rond).jpg")
cross_img =pygame.image.load("croix.png")

circle_img = pygame.transform.scale(circle_img, (SQUARE_SIZE - 40, SQUARE_SIZE - 40))
cross_img = pygame.transform.scale(cross_img, (SQUARE_SIZE - 40, SQUARE_SIZE - 40))

# === Fonctions graphiques ===
def draw_lines():
    for i in range(1, ROWS):
        pygame.draw.line(screen, LINE_COLOR, (0, i * SQUARE_SIZE), (WIDTH, i * SQUARE_SIZE), LINE_WIDTH)
        pygame.draw.line(screen, LINE_COLOR, (i * SQUARE_SIZE, 0), (i * SQUARE_SIZE, HEIGHT), LINE_WIDTH)

def draw_figures():
    for row in range(ROWS):
        for col in range(COLS):
            x = col * SQUARE_SIZE + 20
            y = row * SQUARE_SIZE + 20
            if board[row][col] == 1:
                screen.blit(circle_img, (x, y))
            elif board[row][col] == 2:
                screen.blit(cross_img, (x, y))

# === Fonctions logiques ===
def mark_square(row, col, player):
    board[row][col] = player

def available_square(row, col):
    return board[row][col] == 0

def is_board_full():
    return all(cell != 0 for row in board for cell in row)

def check_win(player):
    for row in board:
        if all(cell == player for cell in row):
            return True
    for col in range(COLS):
        if all(board[row][col] == player for row in range(ROWS)):
            return True
    if all(board[i][i] == player for i in range(ROWS)):
        return True
    if all(board[i][COLS - i - 1] == player for i in range(ROWS)):
        return True
    return False

# === ETAPE 2 : Afficher un écran de fin ===
def display_end_message(message):
    screen.fill(BG_COLOR)
    if check_win(player):   
        pygame.font.init() 
        my_font = pygame.font.SysFont('Comic Sans MS', 30)
        text_surface = my_font.render('You win!!!', False, (0, 0, 0))
        screen.blit(text_surface, (250,300))

    else :
        pygame.font.init() 
        my_font = pygame.font.SysFont('Comic Sans MS', 30)
        text_surface = my_font.render("Game over, You're a loser", False, (0, 0, 0))
        screen.blit(text_surface, (0,0))
        
    pass
   

# === ETAPE 3 : Mouvements aléatoires IA ===
def get_random_move():
    list_case_vides = []
    for col in range(COLS):
        for rows in range(ROWS):
            if available_square(rows,col):
                list_case_vides.append((rows,col))

    return random.choice(list_case_vides)
      
    pass

# === ETAPE 4 : Minimax ===
def minimax(board, depth, is_maximizing):
    ### A REMPLIR : algorithme minimax ###
    pass

def best_move():
    ### A REMPLIR : choisir le meilleur coup pour l'IA via minimax ###
    pass

# === ETAPE 5 : Alpha-Beta Pruning ===
def minimax_ab(board, depth, alpha, beta, is_maximizing):
    ### A REMPLIR : algorithme minimax avec élagage alpha-bêta ###
    pass

def best_move_ab():
    ### A REMPLIR : choisir le meilleur coup pour l'IA via minimax_ab ###
    pass

# === Redémarrage ===
def restart():
    screen.fill(BG_COLOR)
    draw_lines()
    for row in range(ROWS):
        for col in range(COLS):
            board[row][col] = 0

# === Boucle principale ===
draw_lines()
player = 1
game_over = False
ai_mode = "random"  # options: "random", "minimax", "alphabeta"

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_r:
                restart()
                game_over = False
                player = 1

        if event.type == pygame.MOUSEBUTTONDOWN and not game_over:
            mouseX, mouseY = event.pos
            clicked_row = mouseY // SQUARE_SIZE
            clicked_col = mouseX // SQUARE_SIZE

            if available_square(clicked_row, clicked_col):
                mark_square(clicked_row, clicked_col, player)
                draw_figures()
                if check_win(player):
                    display_end_message(f"Joueur {player} gagne !")
                    game_over = True
                player = 2 if player == 1 else 1

    if player == 2 and not game_over:
        pygame.time.wait(300)
        if ai_mode == "random":
            move = get_random_move()
        elif ai_mode == "minimax":
            move = best_move()
        else:
            move = best_move_ab()

        if move:
            mark_square(*move, 2)
            draw_figures()
            if check_win(2):
                display_end_message("L'IA gagne !")
                game_over = True
            player = 1

    pygame.display.update()

