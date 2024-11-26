"""empty message

Revision ID: 9f140cc92f54
Revises: 05650598084e
Create Date: 2024-11-22 12:17:37.490734

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '9f140cc92f54'
down_revision = '05650598084e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('building',
    sa.Column('id', sa.String(length=50), nullable=False),
    sa.Column('created', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updated', sa.DateTime(timezone=True), nullable=True),
    sa.Column('building_id', sa.String(length=100), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('building_id'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.drop_table('account')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('account',
    sa.Column('id', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('created', postgresql.TIMESTAMP(timezone=True), autoincrement=False, nullable=True),
    sa.Column('updated', postgresql.TIMESTAMP(timezone=True), autoincrement=False, nullable=True),
    sa.Column('email', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('username', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('dob', sa.DATE(), autoincrement=False, nullable=True),
    sa.Column('country', sa.VARCHAR(length=100), autoincrement=False, nullable=True),
    sa.Column('phone_number', sa.VARCHAR(length=20), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='account_pkey'),
    sa.UniqueConstraint('email', name='account_email_key')
    )
    op.drop_table('building')
    # ### end Alembic commands ###
